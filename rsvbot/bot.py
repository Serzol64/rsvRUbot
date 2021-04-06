from flask import Flask
app = Flask(__name__)


@app.route('/bot')
def bot():
    return "Добро пожаловать в сервис бота!"

if __name__ == '__main__':
    app.run()