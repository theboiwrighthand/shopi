import { useEffect, useState } from 'react'
import TaskList from '../../components/tasklist/TaskList'
import axios from 'axios';
import { Text, LegacyCard, Layout, TextContainer, Button } from '@shopify/polaris';
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
        <LegacyCard sectioned>
          <LegacyCard.Section>
            <div className='bground'>
              <Layout>
                <Layout.Section oneThird>
                  <div style={{ marginTop: '10%', marginLeft: '150px', width: '30%',height:'100%' }}>
                    <TextContainer>
                      <Text id="storeDetails" variant="heading2xl" as="h3"  >
                        Hey John, Welcome to CarsonDash!
                      </Text>
                      <Text color="subdued" variant="headingLg" as="h5">
                        Submit a new task, pick a task from the catalog or subcribe to submit unlimited tasks
                      </Text>
                      <div style={{ width: '40%' , height:'100%', display: 'flex', flexDirection: 'column' }}>
                        <Button fullWidth  >Submit new task</Button>
                        <br />
                        <Button primary fullWidth >Subsribe & Save</Button>
                      </div>
                    </TextContainer>
                  </div>
                </Layout.Section>
              </Layout>
            </div>

          </LegacyCard.Section>
          <br />
          <LegacyCard.Section>
            <Text variant="heading2xl" as="h3">
              Recent Tasks
            </Text>
            {/* <Scrollable shadow style={{ height: '250px' }} > */}
            <div className='task-list'>
              <TaskList data={tasks} />
            </div>
            {/* </Scrollable> */}
          </LegacyCard.Section>
        </LegacyCard>

    </>

  )
}
