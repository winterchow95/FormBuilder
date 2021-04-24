# FormBuilderAssessment
 A simple react-native application that dynamically adds UI component to form a functional form (without form submission)

# Development Environment

* Windows 10 Home Pro (Development OS)
* Visual Studio Code 1.55.2
* React Native 0.64.0
* Node.js 12.18.3
* Google Pixel 4 XL API 29 (Testing Emulator)

# Sample Screen

![alt text](https://github.com/winterchow95/FormBuilder/blob/main/img/img0.PNG)
![alt text](https://github.com/winterchow95/FormBuilder/blob/main/img/img1.PNG)

# Technical Implementation

Used react hook (useState) to manage single page state management 
e.g. UI components array, modal toggle setting and new UI component type

Used react-redux and redux to perform global state management 
e.g. dispatched action in first page to store data in redux store and used selector to retrieve data in second page

Used navigation container and stack navigator to manage application routing
e.g. added both pages into homenavigator and exported within navigation container to allow application route navigation

Added custom UI component to be used by the form page (second page) of the application
e.g. added number input component that uses regular expression to limit input type to only numbers

# Extra Elaboration

A hashmap was used to store integer (unique identifier for each UI type) and a string (description for each UI type) to imitate a configuration table from persistence layer (database) so that the available types of UI components are defined clearly and limits scope of choice to only intended options.

Middleware such as redux saga and redux thunk was not implemented because it will be an overkill to implement without the requirement to fetch API data or any form of asynchronous function call from developer's perspective.

Data can be passed using navigation parameter from first page to second page if desired but using proper redux is better for global state management in the future where application requires passing numerous data to various pages.

Additional UI components such as email was not added because developer assumed that the scope of this assessment do not require form submission and it is also not sensible to validate UI components such as email based on every key input as it will be annoying to application user who have yet to complete their email input

Lastly, developer have no prior experience with React or React-Native, please take note that all implementations within this application is a learning process for developer and should not be taken as a reference for proper react-native reference for version 0.64.0.
