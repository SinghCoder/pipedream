# Make outbound HTTP requests

In the previous examples, we focused on catching inbound HTTP requests and manipulating the workflow response. Next, let's add an action step to make an outbound request from our workflow. This example builds on the workflow created in [previous sections](/quickstart/) and will cover how to:

- Use the **GET Request** action to make an HTTP request from your workflow
- Use the **Send Test Event** button to test the workflow
- Inspect the action exports and pass them to another step

First, click on the **+** sign between the trigger and code steps to add a step.

![image-20210516204038767](../images/image-20210516204038767.png)

Next, click on the **HTTP / Webhook** app:

![image-20210516204148639](../images/image-20210516204148639.png)

Then select **GET Request** (to make an HTTP `GET` request):

![image-20210516204229156](../images/image-20210516204229156.png)

Next, enter `http://api.open-notify.org/iss-now.json` in the **URL** field. This URL is a free API provided by open-notify.org  to return the current position of the International Space Station (ISS). It does not require any authentication.

![image-20210516210136157](../images/image-20210516210136157.png)

Finally, click **Deploy** and then hit the **Send Test Event** button in the trigger to run the workflow so we can test our change (we don't need to make a live request from our web browser since we're not validating the workflow response with this test).

![image-20210516210434021](../images/image-20210516210434021.png)

Select the new event from the event list to inspect the execution. The response from the **GET Request** action should be exported as `steps.get_request.$return_value`. Expand the `iss_position` key to inspect the `lattitude` and `longitude` returned by the API. If you run the workflow again, you'll see the position change for each execution:

![image-20210516210735882](../images/image-20210516210735882.png)

Next, let's update `$respond()` in `steps.nodejs` to respond with the `iss_position` object. To do that, replace the current value for the `body` parameter with `steps.get_request.$return_value.iss_position` (with no quotes or backticks):

```javascript
await $respond({
  status: 200,
  immediate: true,
  body: steps.get_request.$return_value.iss_position
})
```

![image-20210516211333394](../images/image-20210516211333394.png)

Finally, **Deploy** and reload the endpoint for your workflow in your web browser. `hello foo!` should be replaced by the JSON representing the ISS position. Each time you load the endpoint the most recent position will be returned.

![iss_position](../images/iss_position-1824870.gif)

**Next, let's replace the GET Request action with a code step and use the `axios` npm package to get the position of the ISS.** [Take me to the next example &rarr;](../using-npm-packages/) 
