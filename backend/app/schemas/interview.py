from pydantic import BaseModel


class InterviewStart(BaseModel):
    job_description: str


class InterviewQuestion(BaseModel):
    id: int
    question: str

    class Config:
        from_attributes = True


class InterviewAnswer(BaseModel):
    interview_id: int
    answer: str


class InterviewReport(BaseModel):
    question: str
    answer: str
    feedback: str
    score: int

    class Config:
        from_attributes = True