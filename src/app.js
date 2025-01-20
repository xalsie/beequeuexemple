import lineUp from './job'
import queue from './queue'

queue.on('ready', () => {
  const job1 = lineUp({name: 'Job 1', payload: 'Job 1 payload'})
  const job2 = lineUp({name: 'Job 2', payload: 'Job 2 payload'})

  // const numberOfJobs = 10

  // for (let i = 0; i < numberOfJobs; i++) {
  //   lineUp(`Job ${i}`)
  // }
})
