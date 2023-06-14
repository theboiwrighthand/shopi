import { useEffect, useState } from 'react'
import TaskList from '../../components/tasklist/TaskList'
import axios from 'axios';
import { Text, } from '@shopify/polaris';
import "./home.css"

export default function Home() {
  const [tasks, setTasksList] = useState([])
  useEffect(() => {
    const getData = async () => {
      let response = await axios.get('https://6294640ba7203b3ed067f742.mockapi.io/api/shopify/tasks')
      setTasksList(response.data);
    }
    getData()
  }, [])

  return (
    <>
      
        <img className='bground' src="https://polaris.shopify.com/images/design/space/spacing-polaris-size-units.svg" alt="" />
        <Text variant="heading3xl" as="h2">
          Recent Tasks
        </Text>
        <div className='task-list'>
          <TaskList data={tasks} />
        </div>
    </>

  )
}
