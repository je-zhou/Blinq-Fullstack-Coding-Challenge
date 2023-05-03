# Blinq Fullstack Coding Challenge

Blinq wants to allow it's customers to integrate with third party services in order to sync their contact details with the third party service. Blinq has plans to integrate with dozens of services but for now we are going to start with three:

- Salesforce
- HubSpot
- Zapier

We need you to build out Blinq's Integration Settings page, which must meet the following requirements:

- Show the available integrations
- Support the fields listed by each integration partner
- Allow users to set up an integration by entering in the required information
- Allow users to disconnect an integration they have previously connected

An ideal solution should also be extensible so more integration partners can be added.

Each integration is different and will come with its own integration options. The following are the fields that are required for Blinq to connect to each integration partners API:

- Salesforce — `client_id` and `client_secret`
- Zapier — `api_key`
- HubSpot — `tenant_domain`, `client_id`, `client_secret` and `field_mappings`
  - HubSpot specifically requires Blinq to specify which fields the contact details should be mapped to. These may be like `first_name`, `last_name` or `hs_custom_field1234`.

## The Project Template

We have leveraged Next.js (a popular framework we love using here at Blinq) to set you up with a mock database, user interface and APIs in this project template. You should extend this codebase to complete the coding challenge.

## Getting Started

Setup by running `yarn` && `yarn dev`

***

For node enjoyers - `npm install` and `npm run dev`

## More information

- You do not need to actually sync the contacts with these external services
- You do not need to create actual database connections

## My Approach

### The Design

My first step was to design the UI in [Figma](https://www.figma.com/file/gcEg3ysFjSDNMbcvgbzK60/Blinq---Fullstack-Coding-Project---Design-Sheet?node-id=0%3A1&t=rWFbJp6ujTiw7eVM-1), taking inspiration from Blinq's current webpage for some of the design aspects, colours, and css values.

![Figma Design](/public/assets/FigmaDesign.jpg)

### Code Structure

As I delved into the project, my attention turned to the structure of the UI and how best to implement it using React components. From there, I considered how to connect these components to API routes in order to simulate the experience of connecting with third-party clients. Although this process involved some experimentation and refinement, I eventually arrived at the following workflow.

![Code Structure](/public/assets/Structure.jpg)

### Improvements

- **Stricter parameter checks:** ATM the fields will accept any string longer than 8 characters. This can be improved by checking the specific requirements from each Integration's API and performing stricter client side form validation before sending out an API request to try integrate
- **Load user's integration statuses from database:** ATM will reset to no Integrations connected when page refreshes. In production we should save which Integration services the user has connected to in the database and load this into the IntegrationPartner class before rendering the page.
