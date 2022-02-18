# syntax=docker/dockerfile:1

FROM python:3.8.5

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

CMD python server.py runserver --noreload 0.0.0.0:8081
