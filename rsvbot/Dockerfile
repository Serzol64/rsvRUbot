FROM python:3.7
RUN pip install fastapi uvicorn
EXPOSE 5000
COPY ./ /app
CMD ["uvicorn", "BotService:app", "--host", "service.rsvbot64.ml", "--port", "5000"]
WORKDIR /app