import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"]
})

const consumer = kafka.consumer({ groupId: "my-app3" + Math.random() });


async function main() {
  await consumer.connect();
  await consumer.subscribe({
    topic: "quickstart-events", fromBeginning: true
  })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        offset: message.offset,
        value: message?.value?.toString(),
      })
    },
  })
}


main();