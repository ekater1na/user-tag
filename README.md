# UserTag

This Angular application is a comment system with user mention capabilities. It allows users to add comments, mention other users using the '@' symbol, and display a list of comments.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.7.


## Application Structure
The application consists of three main components:

`CommentsComponent`: The main component that combines the comment list and new comment input.

`CommentListComponent`: A component for displaying the list of comments.

`CommentInputComponent`: A component for inputting new comments.

##  Components

### CommentsComponent
This component serves as a container for all comment functionality.

#### Properties:

`users`: An array of User objects representing users that can be mentioned.

`comments`: An array of Comment objects representing all comments.

#### Methods:

`addComment(newComment: Comment)`: Adds a new comment to the list and notifies about mentioned users.

###  CommentsListComponent

This component is responsible for displaying the list of comments.
#### Input Parameters:

`comments`: An array of comments to display.

`users`: An array of users for formatting mentions.

#### Methods:

`formatCommentText(text: string)`: Formats the comment text, highlighting mentioned users.

### CommentInputComponent

This component provides functionality for inputting new comments.
#### Input Parameters:

`users`: An array of users for the autocomplete feature.

#### Output Parameters:

`commentAdded`: An event emitted when a new comment is added.

#### Properties:

`newComment`: The text of the new comment.

`showUserList`: A flag to display the user list.

`filteredUsers`: A filtered list of users for autocomplete.

#### Methods:

`onInputChange(event: Event)`: Handles changes in the input field, filters users.

`selectUser(user: User)`: Selects a user from the autocomplete list.

`addComment()`: Adds a new comment.

## Interfaces

User

`interface User {
  userID: number;
  name: string;
}`

Comment

`interface Comment {
  text: string;
  taggedUsers: User[];
}`

## Functionality

Adding Comments: Users can enter comment text in the input field and submit it.
Mentioning Users: When typing '@', a list of users appears for autocomplete. Selected users are added to the comment and highlighted.
Displaying Comments: All added comments are displayed in a list. Mentioned users are highlighted in the comment text.
Notifications: When a user is mentioned in a comment, the system shows a notification (currently implemented as an alert).

## Styling
Components use inline styles for basic formatting. Comments are displayed as a list, with each comment having a background highlight. The new comment input field is located below the comment list.


## Testing
The application includes unit tests for each component using Karma and Jasmine. These tests cover:

Adding comments and notifying about tags in CommentsComponent.
Formatting comment text in CommentListComponent.
User filtering, user selection, and comment addition in CommentInputComponent.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
