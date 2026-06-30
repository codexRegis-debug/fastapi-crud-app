from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
import backend.sql_databas


class UserInput(BaseModel):
    username: str

app = FastAPI()

def get_database():
    db = sql_databas.SessionLocal()
    try:
        yield db
    finally:
        db.close()

origins = [
    "https://fastapa.vercel.app",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.post("/api/submit")
async def user_input(user: UserInput, db: Session = Depends(get_database)):
    db_user = sql_databas.User(username = user.username)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"id": db_user.id, "username": db_user.username, "status": "success"}

@app.get("/users")
async def get_user(db: Session = Depends(get_database)):
    users = db.query(sql_databas.User).all()
    return [{"id": u.id, "username": u.username} for u in users]

@app.delete("/users/{user_id}")
async def delete_user_input(user_id: int, db: Session = Depends(get_database)):
    db_user = db.query(sql_databas.User).filter(sql_databas.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code = 404, detail="data not found")
    db.delete(db_user)
    db.commit()
    return {"item deleted sucessfully": True, "item_id": user_id}
