# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Ticket 1: Add Custom ID Field to Agents Table

### Acceptance Criteria:

A new `custom_id` field is to be added to the Agents table in the database.
The field should be able to accommodate alphanumeric values and be unique per Facility.

The `custom_id` field is to be displayed on the Agent profile page in the Facilities' dashboard.

### Time/Effort Estimate:

2-3 hours

### Implementation Details:

- Write a database migration script to add the custom_id field to the Agents table.
- Update the Agent model in the application to include the custom_id field.
- Modify the Agents profile page in the Facilities' dashboard to display the custom_id field.

## Ticket 2: Update getShiftsByFacility Function to Retrieve Custom ID

### Acceptance Criteria:

The getShiftsByFacility function should retrieve the custom_id field for each Agent from the database, and returns it in the Shifts metadata.

### Time/Effort Estimate:

1-2 hours

### Implementation Details:

- Modify the getShiftsByFacility function to include a join with the Agents table to retrieve the custom_id field.
- Update the Shifts metadata returned by the function to include the custom_id field.

## Ticket 3: Update generateReport Function to Use Custom ID

### Acceptance Criteria:

The generateReport function now uses the custom_id field instead of the internal database id when generating reports.

### Time/Effort Estimate:

2-3 hours
### Implementation Details:

Modify the generateReport function to retrieve the custom_id field for each Agent from the database.
Replace the internal database id with the custom_id field in the report generation process.
Test the updated function to ensure reports are generated correctly with the custom_id field.

