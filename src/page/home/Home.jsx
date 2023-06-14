import  { useEffect, useState } from 'react'
import TaskList from '../../components/tasklist/TaskList'
import axios from 'axios';
import { Text,  } from '@shopify/polaris';

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
      <div className='home' >
        <img style={{ width: '100%', objectFit: 'cover',boxShadow:'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px' ,marginBottom:'30px'}} src="https://polaris.shopify.com/images/design/space/spacing-polaris-size-units.svg" alt="" />
        <Text variant="heading3xl" as="h2">
          Recent Tasks
        </Text>
        <TaskList data={tasks} />
      </div>
    </>

  )
}
