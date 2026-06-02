from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_completed: Optional[bool] = None


class TaskResponse(TaskBase):
    id: int
    is_completed: bool
    created_at: datetime
    user_id: int

    class Config:
        from_attributes = True


class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserResponse(UserBase):
    id: int
    created_at: datetime
    tasks: List[TaskResponse] = []

    class Config:
        from_attributes = True
