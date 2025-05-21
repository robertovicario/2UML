FROM python:3.9

WORKDIR /app

COPY app/requirements.txt /app/requirements.txt
COPY . /app

RUN pip install --no-cache-dir -r /app/requirements.txt

EXPOSE 7860

CMD ["gunicorn", "--bind", "0.0.0.0:7860", "app.app:app"]
