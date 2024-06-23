# Dockerfile for Flask backend
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

ENV FLASK_APP=app
ENV FLASK_RUN_HOST=0.0.0.0

CMD ["waitress-serve", "--port=8080", "--call", "app:create_app"]
