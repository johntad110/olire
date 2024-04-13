import time
import json
import mysql.connector
from typing import Union, Optional, List
from mysql.connector.connection import MySQLConnection, MySQLConnectionAbstract


DB_HOST = "uranium.da.hostns.io"
DB_USER = "hayaanvw_olire"
DB_PASSWORD = "mvVh2X2dM4SWUtH98QDe"
DB_NAME = "hayaanvw_olire"
MAX_RETRIES = 10
RETRY_INTERVAL = 5

def connect_to_db() -> Union[MySQLConnection, MySQLConnectionAbstract, None]:
    for _ in range(MAX_RETRIES):
        try:
            connection = mysql.connector.connect(
                host=DB_HOST, password=DB_PASSWORD, database=DB_NAME, user=DB_USER)
            return connection
        except mysql.connector.Error as err:
            print(f"Error connecting to database: {err}")
            time.sleep(RETRY_INTERVAL)


def insert_language_data(data: dict) -> None:
    connection = connect_to_db()
    if connection:
        cursor = connection.cursor()
        sql = """INSERT INTO Programming_Languages (name) VALUES (%s)"""
        cursor.execute(sql, (data["name"],))
        connection.commit()
        connection.close()


def insert_tag_data(data: dict) -> None:
    connection = connect_to_db()
    if connection:
        cursor = connection.cursor()
        sql = """INSERT INTO Tags (name) VALUES (%s)"""
        cursor.execute(sql, (data["name"],))
        connection.commit()
        connection.close()


def insert_library_data(data: dict) -> None:
    connection = connect_to_db()
    if connection:
        cursor = connection.cursor()
        sql = """INSERT INTO Libraries (name, description, url) VALUES (%s, %s, %s)"""
        cursor.execute(sql, (data["name"], data.get(
            "description"), data.get("url")))
        connection.commit()
        connection.close()


def insert_relationships(libraries: dict) -> None:
    connection = connect_to_db()
    if connection:
        cursor = connection.cursor()
        tags = libraries["tags"]
        languages = libraries["programming_languages"]
        lib_id = get_library_id(libraries["name"])
        for tag in tags:
            tag_id = get_tag_id(tag)
            sql = """INSERT INTO Library_Tags (library_id, tag_id) VALUES (%s, %s)"""
            cursor.execute(sql, (lib_id, tag_id))
        for language in languages:
            language_id = get_language_id(language)
            sql = """INSERT INTO Library_Languages (library_id, language_id) VALUES (%s, %s)"""
            cursor.execute(sql, (lib_id, language_id))
        connection.commit()
        connection.close()


def get_library_id(library_name: str) -> int:
    connection = connect_to_db()
    if connection:
        cursor = connection.cursor()
        sql = """SELECT id FROM Libraries WHERE name = %s"""
        cursor.execute(sql, (library_name,))
        result = cursor.fetchone()
        connection.close()
        if result:
            return result[0]
    return -1


def get_tag_id(tag: str) -> int:
    connection = connect_to_db()
    if connection:
        cursor = connection.cursor()
        sql = """SELECT id FROM Tags WHERE name = %s"""
        cursor.execute(sql, (tag,))
        result = cursor.fetchone()
        connection.close()
        if result:
            return result[0]
    return -1


def get_language_id(language: str) -> int:
    connection = connect_to_db()
    if connection:
        cursor = connection.cursor()
        sql = """SELECT id FROM Programming_Languages WHERE name = %s"""
        cursor.execute(sql, (language,))
        result = cursor.fetchone()
        connection.close()
        if result:
            return result[0]
    return -1


def populte_data():
    with open("mock_data.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    # for pl in data["languages"]: insert_language_data({"name": f"{pl}"})
    # for tag in data["tags"]: insert_tag_data({"name": f"{tag}"})
    for lib in data["libraries"]: insert_library_data(lib)
    for lib in data["libraries"]: insert_relationships(lib)

    with open("data_populated.flag", "w", encoding="utf-8") as flag:
        flag.write("Data populated.👍 😉")


if __name__ == "__main__":
    populte_data()
