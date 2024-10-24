FROM python:3.10-slim

WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
EXPOSE 8080
WORKDIR /app/script

CMD ["python", "run.py"]
