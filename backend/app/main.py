from typing import List

import database
import models
import schemas
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

# Inisialisasi Database
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="To-Do List API")

# Konfigurasi CORS (Sesuai PPT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Port Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ENDPOINTS ---


# 1. CREATE: Tambah Tugas
@app.post(
    "/tasks", response_model=schemas.TaskResponse, status_code=status.HTTP_201_CREATED
)
def create_task(task: schemas.TaskCreate, db: Session = Depends(database.get_db)):
    new_task = models.Task(**task.dict())
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


# 2. READ: Lihat Semua Daftar Tugas
@app.get("/tasks", response_model=List[schemas.TaskResponse])
def read_tasks(db: Session = Depends(database.get_db)):
    return db.query(models.Task).all()


# 3. UPDATE: Perbarui Status/Teks Tugas
# 3. UPDATE: Perbarui Status/Teks Tugas
@app.put("/tasks/{task_id}", response_model=schemas.TaskResponse)
def update_task(
    task_id: int,
    task_update: schemas.TaskUpdate,
    db: Session = Depends(database.get_db),
):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Tugas tidak ditemukan")

    # Ambil data yang dikirim oleh client (abaikan yang bernilai None/tidak dikirim)
    # Catatan: Jika menggunakan Pydantic v2, ganti .dict() menjadi .model_dump()
    update_data = task_update.dict(exclude_unset=True)

    # Lakukan perbaruan atribut objek secara dinamis
    for key, value in update_data.items():
        setattr(db_task, key, value)

    db.commit()
    db.refresh(db_task)  # Refresh agar mendapatkan data terbaru dari DB
    return db_task


# 4. DELETE: Hapus Tugas
@app.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(database.get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Tugas tidak ditemukan")

    db.delete(db_task)
    db.commit()
    return None


@app.get("/")
async def root():
    return {"message": "Backend FastAPI Berhasil Terhubung!"}
