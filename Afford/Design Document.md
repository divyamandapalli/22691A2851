# Design Document

## 1. Architecture & Code Structure
- Created using React functional components.
- Used React Router for navigation between pages.
- API calls handled in separate service functions for clean separation.

## 2. Data Modeling
- Example user object:
  {
    id: number,
    name: string,
    email: string
  }
- Stored fetched data in component state using useState.

## 3. Technology Choices
- React → for component-based UI
- Axios → for simpler API requests
- Bootstrap → for quick responsive design

## 4. Routing Strategy
- "/" → Home page
- "/users" → Displays user list
- "/user/:id" → User details page

## 5. Error Handling
- API errors show user-friendly messages.
- Loading states handled with spinners.
- Input validation added for forms.

## 6. Assumptions
- API always returns JSON format.
- User ID is unique and numeric.
