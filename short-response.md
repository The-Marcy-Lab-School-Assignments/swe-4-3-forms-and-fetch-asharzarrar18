# Short Response Questions

## Question 1: Promise Chaining

The following code logs `undefined` in the second `.then()`. Identify the bug and fix it.

```js
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then((response) => {
    if (!response.ok) throw Error(`Fetch failed.`);
    return response.json();
  })
  .then((data) => {
    console.log(data); // undefined!
  })
  .catch((error) => console.error(error.message));
```

**The bug is that response.json() is created but not returned. Since nothing is returned from the first .then(), the next .then() receives undefined.**

## Question 2: Development Servers and CORS

A student opens their `index.html` file directly in the browser (using the `file://` protocol). Their `<script type="module">` tag and `fetch()` call both fail. Explain why, and what they should do instead.

**Opening index.html directly uses the file:// protocol, which does not run the project through a real development server. ES modules and some fetch() requests can fail because the browser treats the file as having an invalid or unsafe origin. Instead they should use a vite development server and open the local server URL.**

## Question 3: The `fetch` Response Object

When we use `fetch()`, why do we check `response.ok` before reading the response body? What kinds of errors does this catch that `.catch()` alone would miss if we skipped this step as shown in the code below:

```js
const response = await fetch(url);
const data = await response.json();
```

**We check response.ok because fetch() does not automatically fail for bad HTTP responses like 404 Not Found or 500 Server Error. .catch() usually only catches network errors, CORS errors, or errors thrown manually. So without checking response.ok, the code might still try to read a failed response as if it worked.**

## Question 4: Async/Await Conversion

Rewrite the following `.then()`-based code using `async`/`await` with `try`/`catch`:

```js
const getJoke = () => {
  try{
    const response= await fetch("https://v2.jokeapi.dev/joke/Programming?type=twopart");
    if (!response.ok){
      throw Error(`Fetch failed. ${response.status}`);
    }
    const data = await response.json()
    return {
      data: data,
      error: null,
    }
  } catch(error) {
    return {
      data: data,
      error: null,
    }
  }
}
```

**Your Answer:**

## Question 5: `event.preventDefault()` and Form Handling

A student writes a form handler but the data never displays. Their code:

```js
form.addEventListener("submit", (event) => {
  const name = form.elements.name.value;
  document.querySelector("#output").textContent = name;
});
```

What is wrong? What happens when they click submit, and how do they fix it?

**The problem is that the form’s default submit behavior is not stopped. When the student clicks submit, the browser reloads the page. Since the page reloads, the displayed data disappears right away. They need to call event.preventDefault() at the start of the submit handler.**

## Question 6: Putting It All Together

The steps below describe how to build a form that fetches Pokemon data from `https://pokeapi.co/api/v2/pokemon/{name}` based on the name entered in the form and displays the pokemon's data on the page. The steps are listed in a **random order**. Rearrange them into the correct sequence.

- A. Parse the response body with `await response.json()`
- B. Call `event.preventDefault()` to stop the page from reloading
- C. Check `response.ok` and throw an error if the response failed
- D. Update the DOM with the Pokemon's data
- E. Add a `'submit'` event listener to the form
- F. Handle errors in the `catch` block (display an error message)
- G. Extract the Pokemon name from the form input
- H. Send a GET request with `fetch()` using the Pokemon name in the URL
- I. Reset the form with `form.reset()`
- J. Create the HTML form with a name input and output elements for displaying results

**J, E, B, G, H, C, A, D, I, F**
