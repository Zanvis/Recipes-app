import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { useState, useRef, SetStateAction, useEffect } from 'react';

const Tab2: React.FC = () => {
  // const [recipeName, setRecipeName] = useState('');
  // const [recipeDescription, setRecipeDescription] = useState('');
  // const [recipeInstructions, setRecipeInstructions] = useState('');

  // const handleRecipeNameChange = (e: CustomEvent) => {
  //   setRecipeName(e.detail.value!);
  // };

  // const handleRecipeDescriptionChange = (e: CustomEvent) => {
  //   setRecipeDescription(e.detail.value!);
  // };

  // const handleRecipeInstructionsChange = (e: CustomEvent) => {
  //   setRecipeInstructions(e.detail.value!);
  // };

  // const handleSubmit = () => {
  //   const recipeData = {
  //     name: recipeName,
  //     description: recipeDescription,
  //     instructions: recipeInstructions
  //   };

  //   localStorage.setItem('recipes', JSON.stringify([recipeData, ...JSON.parse(localStorage.getItem('recipes') || '[]')]));

  //   console.log(localStorage.getItem('recipes'));
  //   // Redirect back to Tab1
  //   window.location.href = '/';
  // };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* <div style={{ marginTop: '20px' }}></div>
        <IonInput
          label="Nazwa potrawy"
          labelPlacement="floating"
          fill="solid"
          placeholder="Nazwa"
          value={recipeName}
          onIonInput={handleRecipeNameChange}
        ></IonInput>
        <IonInput
          label="Opis potrawy"
          labelPlacement="floating"
          fill="solid"
          placeholder="Enter text"
          value={recipeDescription}
          onIonInput={handleRecipeDescriptionChange}
        ></IonInput>
        <IonInput
          label="Przepis"
          labelPlacement="floating"
          fill="solid"
          placeholder="Enter text"
          value={recipeInstructions}
          onIonInput={handleRecipeInstructionsChange}
        ></IonInput>
        <IonButton onClick={handleSubmit}>Dodaj</IonButton> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;