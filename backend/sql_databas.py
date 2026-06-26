from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv()
SQLALCHEMY_DATABASE_URL  = os.getenv("DATABASE_URL", "sqlite:///.users.db")


engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args = {"check_same_thread": False})
SessionLocal = sessionmaker(autocommit = False, autoflush = False, bind = engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key = True, index = True)
    username = Column(String, index = True)

Base.metadata.create_all(bind = engine)
