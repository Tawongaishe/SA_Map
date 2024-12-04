import psycopg2

# Test direct connection without SQLAlchemy
def test_connection():
    try:
        conn = psycopg2.connect(
            dbname="postgres",
            user="Tawongaishe",
            password="AWS18tj!!",
            host="startupmap-database.cb6q4kuyc8q7.us-east-2.rds.amazonaws.com",
            port="5432"
        )
        print("Connection successful!")
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_connection()