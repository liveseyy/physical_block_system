# physical_block_system

## Запуска проекта (windows):
#### 1. Скопировать проект в текущую папку:

```
git clone https://github.com/liveseyy/physical_block_system.git
```

#### 2. Перейти в physical_block_system:

```
cd physical_block_system
```

#### 3. Создать виртуальное окружение(чтобы не захломлять pip пакетами основное окружение):

```
python -m venv venv
```

#### 4. Активируем виртуальное окружение из папки physical_block_system:

```
cd venv/Scripts && activate.bat && cd ../../
```

#### 5. Устанавлием необходимые зависимости:

```
pip install -r requirements.txt
```

#### 6. Создаем БД и применяем миграции:

```
cd physical_block_system && python manage.py migrate
```

#### 7. Запускаем сервер на ```127.0.0.1:8000```:

```
python manage.py runserver
```
