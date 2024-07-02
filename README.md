# Grocery Game

This is an app that helps you manage your grocery shopping list.

## Workflow Doc

[Workflow Doc](https://docs.google.com/document/d/1eViRS9ULNMJRaJwmiJKYrWIrI57_2v5ifvItTkjiClc/edit?pli=1)

## How To Run App

1. npm install
2. npx expo install expo-dev-client
3. npx expo start OR npx expo run:ios

## First Iteration

Add, modify, and delete items from your grocery list. Storage will persist inbetween runs with realm.

## Desired End Result

- Multiple screens
- Add custom editable recipes
- Add a recipe to your grocery list
  - items from that recipe will appear on grocery list
- Nicer looking UI, specifically on iOS

## Notes for self

- create without db first
- only store grocery list in database, not individual items
  - grocery list contains all items that i need
  - item class is for id purposes
  - only directly interact with grocery list class
  - sketch it out!
- services contains business code, database contains code that controls db
  - components use objects of classes i create in services as props
- nest components inside of each other
  - item inside list; render list in app
- create multiple screens
  - control with navigation folder
- one style sheet per component
