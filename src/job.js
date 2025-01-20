import queue from './queue'

const retryCount = 20

const lineUp = async (payload) => {
  const job = await queue.createJob(payload)
    .backoff('fixed', 30_000)
    .retries(retryCount)
    .save()
    .then((job) => {
      console.log(`${new Date().toISOString()} jobId: ${job.id} is saved.`)
      return job
    })

  job.logs = []
  job.logs.push(`${new Date().toISOString()} jobId: ${job.id} is saved.`)

  job.on('succeeded', (result) => {
    console.log(`${new Date().toISOString()} jobId: ${job.id} received good result ${result}.`)
  })

  job.on('retrying', (err) => {
    console.log(`${new Date().toISOString()} jobId: ${job.id} failed as ${err.message} but is gonna retry! (Retry count: ${retryCount - job.options.retries}) - (${job.options.backoff.delay} ms)`)

    console.log(`${new Date().toISOString()} jobId: ${job.id} is gonna retry in ${job.options.backoff.delay/1000} seconds. (${job.options.backoff.delay} ms)`)
  })

  return job
}

export default lineUp
