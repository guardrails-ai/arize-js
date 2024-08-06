# Running this repo
## install python and js dependencies

### First Python
```bash
# using python venv
# if using conda or other virtual env, please refer to their documentation
python -m venv .venv;
source .venv/bin/activate;

pip install guardrails-ai;

echo "run guardrails configure to setup the app";
guardrails configure;
```

#### create guardrails config + install validators

```bash
guardrails create --validators hub://guardrails/lowercase,hub://guardrails/two_words --name arize;
```

### Install js stuff

```bash
npm i;

```

## Run the Guardrails API
```bash
guardrails start;
```

## Try the JS script
```bash
node index.js;
```

The output should look like
```
A successful validation on static data
{
  callId: '135912099249632',
  rawLlmOutput: 'two words',
  validatedOutput: 'two words',
  reask: undefined,
  validationPassed: true,
  error: undefined
}

An unsuccessful validation on static data
{
  callId: '135912099398032',
  rawLlmOutput: 'oneword',
  validatedOutput: 'oneword',
  reask: undefined,
  validationPassed: false,
  error: undefined
}

 A successful validation on LLM data
{
  callId: '135912099401312',
  rawLlmOutput: 'apple orange',
  validatedOutput: 'apple orange',
  reask: undefined,
  validationPassed: true,
  error: undefined
}

 An unsuccessful validation on LLM data
{
  callId: '135912095576656',
  rawLlmOutput: 'apple banana cherry',
  validatedOutput: 'apple banana cherry',
  reask: undefined,
  validationPassed: false,
  error: undefined
}
```


# How it works

running `guardrails create...` creates a configuration file called `config.py` with a Guard prebuilt using the validator URIs that we pass. The `--name` flag gives that guard a name.

In the javascript code (index.js), we create a js client and make a request to pull in that guard using the guard name. We can then use that guard object to make requests to the 'call' function on the guard object. We can also make requests using the `validate` function on the guard object to validate some data that comes out of an LLM.