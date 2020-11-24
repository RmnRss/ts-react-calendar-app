# Calendar app

A simple calendar app I used to improve my skills with typescript and react.

## Useful commands

### Starting the app for development

run `yarn start`

### Running tests

run `yarn tests` to run the tests

### Building the app

run `yarn build` to build the project

## Project Structure

```bash

│   public
│   src
|   |
|   └───  assets        # icons, images...
|   └───  components    # components
|   |     |
|   |     └───  inputs
|   |     └───  ...     # rest of the componenents
|   └───  hooks
|   └───  providers
|   └───  services
|   └───  tests         # test files
|   └───  types         # types

```

## Tools & Library used

- [typescript](https://www.typescriptlang.org/);
- [styled-components](https://styled-components.com/) - for styling;
- [date-fns](https://date-fns.org/) - to handle dates;
- [testing library](https://testing-library.com/) - for testing;
- [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup) : for forms creation & validation.

# Improvements

- [ ] Store data locally to persist events between reload and reboots
- [ ] Add different layouts options to visualize dates and events


