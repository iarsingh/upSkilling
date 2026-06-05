import argparse
import json

import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions


class ParseMessage(beam.DoFn):
    def process(self, message: bytes):
        yield json.loads(message.decode("utf-8"))


def run(argv=None):
    parser = argparse.ArgumentParser()
    parser.add_argument("--input-topic", required=True)
    parser.add_argument("--output-table", required=True)
    known_args, pipeline_args = parser.parse_known_args(argv)

    with beam.Pipeline(options=PipelineOptions(pipeline_args)) as pipeline:
        (
            pipeline
            | "Read" >> beam.io.ReadFromPubSub(topic=known_args.input_topic)
            | "Parse" >> beam.ParDo(ParseMessage())
            | "Write" >> beam.io.WriteToBigQuery(known_args.output_table)
        )


if __name__ == "__main__":
    run()

