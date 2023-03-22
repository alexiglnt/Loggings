import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { MongoClient } from 'mongodb';
import { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap'
import Log from '@/LogInterface';

const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  logs: Log[]
}

export default function Home({ logs }: HomeProps) {
  const [error, setError] = useState('');
  const [type, setType] = useState('');
  const [placeholder, setPlaceholder] = useState('{ "code": "rest_no_route", "message": "No route found", "data": { "status": 404 } }');
  const [currentLogs, setCurrentLogs] = useState<Log[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    try {
      console.log('error', error)

      // on change le type de la variable error en string

      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error, type }),
      });

      const result = await response.json();
      setCurrentLogs(result);

      // On actualise la page pour afficher le nouveau log
      window.location.reload();
    } catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    console.log('logs', logs)
    
    // inverser l'ordre des logs
    const reversedLogs = logs.reverse();
    setCurrentLogs(reversedLogs);
  }, [])

  return (
    <>

      <div className={styles.main} >
        <h1> Ingestion d’évènement <span> LOGGING </span> </h1>

        <form onSubmit={handleSubmit}>
          <label> Error message : </label>
            <input type="text" placeholder={placeholder} value={error} onChange={(event) => setError(event.target.value)} />
          
          <br />
          <label> Type : </label>
            <input type="text" placeholder='WordPress' value={type} onChange={(event) => setType(event.target.value)} />
          
          <br />
          <button type="submit">Submit</button>
        </form>

        <ListGroup className={styles['log-list']} >
          {logs.map((log, index) => {
            return (
              <ListGroup.Item key={index} className={styles['log-item']} >

                <details id="log-details" >
                  <summary > {log.type} • <span> {log.dateTime} </span> </summary>
                  <code> {log.error} </code>
                </details>

              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </div>

    </>
  )
}

export async function getServerSideProps() {

  const mongouri = "mongodb://localhost:27017";
  const database = "loggings";

  const client = new MongoClient(mongouri);
  await client.connect();

  const db = client.db(database);
  const collection = db.collection<Log>("loggings");
  // await collection.insertOne({ name: 'John Doe' });


  // console.log('show collections', await db.listCollections().toArray());

  const logs = await collection.find().sort({ error: -1 }).toArray()
  console.log('logs', await logs)

  return {
    props: {
      logs: JSON.parse(JSON.stringify(logs)),
    },
  }
}
