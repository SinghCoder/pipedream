# hello ${name}!

Next, let's pass a name in each HTTP request and return it in the workflow response. This example builds on the workflow we created in [hello world!](/quickstart/hello-world/) and will cover how to:

[[toc]]

### Pass data to an HTTP triggered workflow via query parameters

First, modify the endpoint URL you loaded in your browser to trigger your workflow and add `?name=foo` to the end (e.g., `https://ENDPOINT-ID.m.pipedream.net/?name=foo`). Then load it to make another request to your workflow. You should still see `hello world!` returned as the response from your workflow.

![name-foo](./name-foo.gif)

### Inspect the query data sent to the workflow

Return to Pipedream and select the event you just generated from the event list. You should now see `{1}` next to the `query` field indicating it has nested values. Expand it to inspect the query parameter and value for the request. 

![image-20210525170616605](./image-20210525170616605.png)

::: tip
If you don't see any query data, check the `url` parameter in the `steps.trigger.event` observation to make sure you didn't select the event associated with the browser's `favicon.ico` request.
:::

### Customize the HTTP response using data sent to the workflow

Next, let's incorporate this data into the workflow response. Expand the code section of `steps.respond` if it's collapsed. Then modify the value for the `body` parameter of the `$respond()` function and replace `world` with `${steps.trigger.event.query.name}` to reference the name we're passing to the trigger:

```javascript
await $respond({
  status: 200,
  immediate: true,
  body: `hello ${steps.trigger.event.query.name}!`
})
```

![image-20210525170745094](./image-20210525170745094.png)

Finally, **Deploy** and reload the URL in your browser:

![hello-name](./hello-name.gif)

Your workflow will now return `hello foo!` (or whatever value you pass to `name`) instead of `hello world!`.

**Next, let's add an action to make an HTTP request from this workflow.**

<p style="text-align:center;">
<a href="/quickstart/make-http-request/"><img src="../next.png"></a>
</p>