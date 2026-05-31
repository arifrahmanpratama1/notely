from typing import List

import database
import models
import schemas
import security
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="To-Do List API with Auth")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post(
    "/users", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED
)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = (
        db.query(models.User)
        .filter(
            (models.User.email == user.email) | (models.User.username == user.username)
        )
        .first()
    )
    if db_user:
        raise HTTPException(
            status_code=400, detail="Username or Email already registered"
        )

    hashed_pwd = security.hash_password(user.password)

    new_user = models.User(
        username=user.username, email=user.email, password_hash=hashed_pwd
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.get("/users/{user_id}", response_model=schemas.UserResponse)
def get_user(user_id: int, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.post(
    "/users/{user_id}/tasks",
    response_model=schemas.TaskResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_task_for_user(
    user_id: int, task: schemas.TaskCreate, db: Session = Depends(database.get_db)
):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    new_task = models.Task(**task.model_dump(), user_id=user_id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


@app.get("/users/{user_id}/tasks", response_model=List[schemas.TaskResponse])
def read_tasks_for_user(user_id: int, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user.tasks


@app.put("/tasks/{task_id}", response_model=schemas.TaskResponse)
def update_task(
    task_id: int,
    task_update: schemas.TaskUpdate,
    db: Session = Depends(database.get_db),
):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    update_data = task_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_task, key, value)

    db.commit()
    db.refresh(db_task)
    return db_task


@app.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(database.get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(db_task)
    db.commit()
    return None


@app.get("/")
async def root():
    return {"message": "Backend FastAPI with User-Task Relationships is active!"}
