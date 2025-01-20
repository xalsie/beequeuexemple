import lineUp from './job'
import queue from './queue'

queue.on('ready', () => {
  // const job1 = lineUp('Job 1')
  // const job2 = lineUp('Job 2')

  const numberOfJobs = 10

  for (let i = 0; i < numberOfJobs; i++) {
    lineUp(`Job ${i}`)
  }
})
