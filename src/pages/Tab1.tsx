import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonModal, IonButtons, IonItem, IonInput, useIonActionSheet, IonLabel, IonTextarea, IonSearchbar, IonIcon, IonAlert, IonReorderGroup, IonReorder, ItemReorderEventDetail, IonToast, IonToggle, IonMenu, IonMenuButton } from '@ionic/react';
import './Tab1.css';
import { useEffect, useRef, useState } from 'react';
import { OverlayEventDetail } from '@ionic/core/components';
// import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Camera, CameraResultType } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { App } from '@capacitor/app';
// import './theme/variables.css';
import type { ToggleCustomEvent } from '@ionic/react';
defineCustomElements(window);

const Tab1: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [imageSrc, setImageSrc] = useState<string | undefined>('/assets/food.jpg');
  const [present] = useIonActionSheet();
  const [Index, setIndex] = useState(0);

  const [themeToggle, setThemeToggle] = useState(false);

  // Listen for the toggle check/uncheck to toggle the dark theme
  const toggleChange = (ev: ToggleCustomEvent) => {
    toggleDarkTheme(ev.detail.checked);
    localStorage.setItem('theme', ev.detail.checked ? 'dark' : 'light');
    // console.log(`Theme saved to localStorage: ${ev.detail.checked ? 'dark' : 'light'}`);
  };
  
  // Add or remove the "dark" class on the document body
  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle('dark', shouldAdd);
  };
  
  // Check/uncheck the toggle and update the theme based on isDark
  const initializeDarkTheme = (isDark: boolean) => {
    setThemeToggle(isDark);
    toggleDarkTheme(isDark);
  };
  
  useEffect(() => {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    initializeDarkTheme(prefersDark.matches);
  
    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => initializeDarkTheme(mediaQuery.matches));
  
    // Load the theme from localStorage
    const theme = localStorage.getItem('theme');
    if (theme) {
      setThemeToggle(theme === 'dark');
      toggleDarkTheme(theme === 'dark');
      // console.log(`Theme loaded from localStorage: ${theme}`);
    }
  }, []);
  
  const handleRecipeNameChange = (e: CustomEvent) => {
    setRecipeName(e.detail.value!);
  };

  const handleRecipeDescriptionChange = (e: CustomEvent) => {
    setRecipeDescription(e.detail.value!);
  };

  const handleRecipeInstructionsChange = (e: CustomEvent) => {
    setRecipeInstructions(e.detail.value!);
  };
  // const handleSubmit = () => {
  //   const recipeData = {
  //     name: recipeName,
  //     description: recipeDescription,
  //     instructions: recipeInstructions,
  //     image: imageSrc
  //   };

  //   localStorage.setItem('recipes', JSON.stringify([recipeData, ...JSON.parse(localStorage.getItem('recipes') || '[]')]));

  //   // console.log(localStorage.getItem('recipes'));
  //   // Redirect back to Tab1
  //   // window.location.href = '/';
  // };
  const [Duplicate, setDuplicate] = useState(false);
  const handleSubmit = () => {
    const isDuplicate = results.some((recipe) => recipe.name.toLowerCase() === recipeName.toLowerCase());

    if (isDuplicate) {
      // console.log(`Recipe with the name '${recipeName}' already exists. Please choose a unique name.`);
      setDuplicate(true);
      return;
    }
    const recipeData = {
      name: recipeName,
      description: recipeDescription,
      instructions: recipeInstructions,
      image: imageSrc
    };
  
    // Retrieve the current order from local storage
    const resultsOrder = JSON.parse(localStorage.getItem('resultsOrder') || '[]');
  
    // Add the new recipe to the results array
    const updatedResults = [
      ...results,
      {
        ...recipeData,
        originalIndex: results.length // Assign a new index for the new recipe
      }
    ];
  
    // Save the new order to local storage
    localStorage.setItem('resultsOrder', JSON.stringify([...resultsOrder, results.length]));
  
    // Update the state with the new results
    setResults(updatedResults);
  
    // Save the new recipe to local storage
    localStorage.setItem('recipes', JSON.stringify([recipeData, ...JSON.parse(localStorage.getItem('recipes') || '[]')]));
  
    // Reset the form values
    // setRecipeName('');
    // setRecipeDescription('');
    // setRecipeInstructions('');
    // setImageSrc('/assets/food.jpg');
    setDuplicate(false);
    modal.current?.dismiss(input.current?.value, 'confirm');
    window.location.reload();
  };

  function confirm() {
    // modal.current?.dismiss(input.current?.value, 'confirm');
    handleSubmit();
    // window.location.reload();
  }
// localStorage.clear();
  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    // if (ev.detail.role === 'confirm') {
    //   handleSubmit();
    //   window.location.href = '/';
    // }
  }
  // try{
  //   localStorage.setItem('recipes', JSON.stringify([]));
  // }catch(e){
  //   console.log(e);
  // }
  // localStorage.clear();
  const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
  recipes.reverse();
  // const [selectedImage, setSelectedImage] = useState<File | undefined>();
  
  // działa na windowsie, na androidzie nie
  // const pickImages = async () => {
  //   const result = await FilePicker.pickImages({
  //     multiple: false,
  //   });
  //   const file = result.files[0];

  //   const formData = new FormData();
  //   if (file.blob) {
  //     const rawFile = new File([file.blob], file.name, {
  //       type: file.mimeType,
  //     });
  //     formData.append('file', rawFile, file.name);
  //   }

  //   setImageSrc(URL.createObjectURL(file.blob!));
  //   console.log(imageSrc);
  // };

  // const getPhoto = async () => {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: false,
  //     resultType: CameraResultType.Uri,
  //   });
  //   setImageSrc(image.webPath);
  // };
  const getPhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });
  
      setImageSrc(image.webPath);
    } catch (error) {
      setImageSrc('/assets/food.jpg');
    }
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOpenCardModal, setisOpenCardModal] = useState(false);
  // const EditModal = () => {
  //   return (
  //     <IonModal isOpen={isEditModalOpen} ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
  //       <IonHeader>
  //         <IonToolbar>
  //           <IonButtons slot="start">
  //             <IonButton onClick={() => modal.current?.dismiss()}>Anuluj</IonButton>
  //           </IonButtons>
  //           <div style={{textAlign: 'center', marginLeft:'25px'}}>
  //             <IonTitle>Przepis</IonTitle>
  //           </div>
  //           <IonButtons slot="end">
  //             <IonButton strong={true} onClick={() => confirm()}>
  //               Potwierdź
  //             </IonButton>
  //           </IonButtons>
  //         </IonToolbar>
  //       </IonHeader>
  //       <IonContent className="ion-padding">

  //       </IonContent>
  //     </IonModal>
  //   );
  // };


  // do zrobienia jeszcze

const EditModal = () => {
  const [EditDuplicate, setEditDuplicate] = useState(false);
  // const recipes = JSON.parse(localStorage.getItem('recipes') || '[]').reverse();
  // const name = recipes[Index].name;
  // const description = recipes[Index].description;
  // const instructions = recipes[Index].instructions;
  // const image = recipes[Index].image;
  const selectedRecipe = results[Index]; // Use results instead of recipes
  // Check if the selectedRecipe is defined
  if (!selectedRecipe) {
    // Handle the case where the selected recipe is undefined
    return null; // or any other suitable action
  }

  const name = selectedRecipe.name || '';
  const description = selectedRecipe.description || '';
  const instructions = selectedRecipe.instructions || '';
  const image = selectedRecipe.image;
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedInstructions, setEditedInstructions] = useState(instructions);
  const [editedImageSrc, setEditedImageSrc] = useState<string | undefined>(image);

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);

    // Set initial values when the modal opens
    const recipes = JSON.parse(localStorage.getItem('recipes') || '[]').reverse();
    const { name, description, instructions } = recipes[Index];
    setEditedName(name || ''); // Use an empty string if the value is undefined
    setEditedDescription(description || '');
    setEditedInstructions(instructions || '');
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };
  
  const confirmEdit = () => {
    const isDuplicate = results.some((recipe, i) => i !== Index && recipe.name === editedName);

    if (isDuplicate) {
      setEditDuplicate(true);
      return;
    }
  
    modal.current?.dismiss(input.current?.value, 'confirm');

    // Get the updated recipe data
    const updatedRecipe = {
      name: editedName,
      description: editedDescription,
      instructions: editedInstructions,
      image: editedImageSrc, // You may want to update this based on how you handle images
    };

    // Update the recipe data in localStorage without changing the order
    // const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    // const reversedRecipes = recipes.reverse(); // Reverse for update
    // reversedRecipes[Index] = updatedRecipe;
    // localStorage.setItem('recipes', JSON.stringify(reversedRecipes.reverse())); // Reverse back after update

    // Use the original index from the unfiltered array
    const originalIndex = results[Index].originalIndex;

    // Update the localStorage without changing the order
    const updatedRecipes: { name: string; description: string; instructions: string; image: string | undefined }[] = [...originalRecipes];
    updatedRecipes[originalIndex] = updatedRecipe;
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes.reverse()));
  
    // Update the results array directly
    const updatedResults = [...results];
    updatedResults[Index] = updatedRecipe;
    setResults(updatedResults);
    // Reset the modal and state
    setIsEditModalOpen(false);
    window.location.reload();
  };
  const getPhotoEdit = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });
  
      setEditedImageSrc(image.webPath);
    } catch (error) {}
  };
  const deleteEditPhoto = () => {
    setEditedImageSrc('/assets/food.jpg');
  }
  return (
    <IonModal isOpen={isEditModalOpen} onWillDismiss={() => handleEditModalClose()}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => handleEditModalClose()}>Anuluj</IonButton>
          </IonButtons>
          <div style={{ textAlign: 'center', marginLeft: '25px' }}>
            <IonTitle>Edytuj</IonTitle>
          </div>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={() => confirmEdit()}>
              Potwierdź
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            clearInput={true}
            spellCheck={true}
            autocorrect='on'
            autocapitalize='on'
            label="Nazwa potrawy"
            labelPlacement="stacked"
            ref={input}
            type="text"
            placeholder="Wprowadź tekst"
            value={editedName}
            onIonInput={(e) => setEditedName(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonInput
            clearInput={true}
            spellCheck={true}
            autocorrect='on'
            autocapitalize='on'
            label="Opis potrawy"
            labelPlacement="stacked"
            ref={input}
            type="text"
            placeholder="Wprowadź tekst"
            value={editedDescription}
            onIonInput={(e) => setEditedDescription(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonTextarea
            spellCheck={true}
            autocapitalize='on'
            label="Przepis"
            labelPlacement="stacked"
            // ref={input}
            // type="text"
            autoGrow={true}
            placeholder="Wprowadź tekst"
            value={editedInstructions}
            onIonInput={(e) => setEditedInstructions(e.detail.value!)}
          />
        </IonItem>
        {/* Add a button to change the recipe image */}
        {/* <IonButton style={{ marginTop: '10px', marginBottom: '10px' }} expand="block" onClick={() => getPhotoEdit()}>
          Zmień zdjęcie potrawy
        </IonButton> */}
        <IonGrid style={{paddingLeft: '0px', paddingRight: '0px'}}>
          <IonRow>
            <IonCol style={{paddingLeft: '0px', paddingRight: '0px'}}>
              <IonButton expand="block" onClick={() => getPhotoEdit()}>Zmień zdjęcie potrawy</IonButton>
            </IonCol>
            <IonCol size="auto" style={{paddingRight: '0px'}}>
              <IonButton style={{paddingRight: '0px'}} onClick={() => deleteEditPhoto()}>X</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <img width={400} height={300} src={editedImageSrc} alt="Image of the recipe" />
        <IonToast color={'danger'} isOpen={EditDuplicate} message="Nazwa przepisu jest już używana. Wybierz unikalną nazwę." onDidDismiss={() => setEditDuplicate(false)} duration={5000}></IonToast>
      </IonContent>
    </IonModal>
  );
};

  const OpenCardModal= () =>  {
    function confirmModal() {
      modal.current?.dismiss(input.current?.value, 'confirm');
      window.location.reload();
    }
    const handleEditModalOpen = () => {
      setisOpenCardModal(true);
    };
  
    const handleEditModalClose = () => {
      setisOpenCardModal(false);
    };

    // const recipes = JSON.parse(localStorage.getItem('recipes') || '[]').reverse();
    // const name = recipes[Index].name;
    // const description = recipes[Index].description;
    // const instructions = recipes[Index].instructions;
    // const image = recipes[Index].image;

    const selectedRecipe = results[Index]; // Use results instead of recipes
    // Check if the selectedRecipe is defined
    if (!selectedRecipe) {
      // Handle the case where the selected recipe is undefined
      return null; // or any other suitable action
    }

    const name = selectedRecipe.name || '';
    const description = selectedRecipe.description || '';
    const instructions = selectedRecipe.instructions || '';
    const image = selectedRecipe.image;

    // console.log(name, description, instructions, image);

    return (
      <IonModal isOpen={isOpenCardModal} onWillDismiss={() => handleEditModalClose()}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => handleEditModalClose()}>Anuluj</IonButton>
            </IonButtons>
            <div style={{textAlign: 'center', marginLeft:'25px'}}>
              <IonTitle>Przepis</IonTitle>
            </div>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={() => confirmModal()}>
                Potwierdź
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <img src={image} width={400} height={300}></img>
          <IonItem>
            <IonLabel>{name}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>{description}</IonLabel>
          </IonItem>
          <IonItem>
            {/*style={{ whiteSpace: 'pre-line' }} pozwoli zachować zrobioną nową linię*/}
            <IonTextarea style={{ whiteSpace: 'pre-line' }} readonly={true}>{instructions}</IonTextarea>
          </IonItem>
        </IonContent>
      </IonModal>
    );
  };
  
  function PassIndex(index: number) {
    setisOpenCardModal(true);
    setIndex(index);
  }

  // function FullModalCard (index: number){
  //   setisOpenCardModal(true);
  //   const recipes = JSON.parse(localStorage.getItem('recipes') || '[]').reverse();
  //   const name = recipes[index].name;
  //   const description = recipes[index].description;
  //   const instructions = recipes[index].instructions;
  //   const image = recipes[index].image;
  //   console.log(name, description, instructions, image);
  // }
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  function DeleteCard(index: number) {
    setIndex(index);
    return new Promise<boolean>((resolve) => {
      present({
        id:"present-alert",
        // header: 'Czy chcesz usunąć przepis?',
        buttons: [
          {
            text: 'Edytuj',
            role: 'edit',
            cssClass: 'edit-button',
            handler: () => {
              setIsEditModalOpen(true);
            },
          },
          {
            text: 'Usuń przepis',
            role: 'confirm',
            cssClass: 'delete-button',
          },
        ],
        onWillDismiss: (ev) => {
          if (ev.detail.role === 'confirm') {
            // const recipes = JSON.parse(localStorage.getItem('recipes') || '[]').reverse();
            // if (index >= 0 && index < recipes.length) {
            //   recipes.splice(index, 1); 
            //   recipes.reverse();
            //   localStorage.setItem('recipes', JSON.stringify(recipes));
            //   window.location.reload();
            // }
            // resolve(true);
            // const recipesCopy = [...recipes];
            // if (index >= 0 && index < recipesCopy.length) {
            //   recipesCopy.splice(index, 1);
            //   recipesCopy.reverse();
            //   localStorage.setItem('recipes', JSON.stringify(recipesCopy));
            //   setResults(recipesCopy);
            //   window.location.reload();
            // }
            // resolve(true);
            
            //to poprawne
            // const originalIndex = results[index].originalIndex;
            // const recipesCopy = [...recipes];
            // if (originalIndex >= 0 && originalIndex < recipesCopy.length) {
            //   recipesCopy.splice(originalIndex, 1);
            //   recipesCopy.reverse();
            //   localStorage.setItem('recipes', JSON.stringify(recipesCopy));
            //   setResults(recipesCopy);
            //   window.location.reload();
            // }
            setIsDeleteAlertOpen(true);
            resolve(true);
          }
        },
      });
    }
    );
  }
  // localStorage.clear();
  // const handleDeleteConfirmation = () => {
  //   // Handle the logic to delete the recipe
  //   const originalIndex = results[Index].originalIndex;
  //   const recipesCopy = [...recipes];
    
  //   if (originalIndex >= 0 && originalIndex < recipesCopy.length) {
  //     recipesCopy.splice(originalIndex, 1);
  //     recipesCopy.reverse();
  //     localStorage.setItem('recipes', JSON.stringify(recipesCopy));
  //     setResults(recipesCopy);
  //     window.location.reload();
  //   }
  
  //   // Close the delete alert
  //   setIsDeleteAlertOpen(false);
  // };

  // nie bierze pod uwagę jak zmieni się kolejność przepisów
  // const handleDeleteConfirmation = () => {
  //   const updatedRecipes = [...originalRecipes];

  //   if (Index >= 0 && Index < updatedRecipes.length) {
  //     updatedRecipes.splice(Index, 1);

  //     setOriginalRecipes(updatedRecipes);
  //     const updatedResults = updatedRecipes.map((recipe: any, originalIndex: number) => ({
  //       ...recipe,
  //       originalIndex,
  //     }));
  //     setResults(updatedResults);

  //     localStorage.setItem('recipes', JSON.stringify(updatedRecipes.reverse()));
  //     localStorage.setItem(
  //       'resultsOrder',
  //       JSON.stringify(updatedResults.map((item: any) => item.originalIndex))
  //     );

  //   } else {
  //     console.error('Invalid recipe index:', Index);
  //   }
  //   setIsDeleteAlertOpen(false);
  // };
  const handleDeleteConfirmation = () => {
    const updatedRecipes = [...originalRecipes];
    const resultsOrder = JSON.parse(localStorage.getItem('resultsOrder') || '[]');
    if (resultsOrder) {
      if (Index >= 0 && Index < updatedRecipes.length) {
        const originalIndex = resultsOrder[Index];
  
        if (originalIndex >= 0 && originalIndex < updatedRecipes.length) {
          updatedRecipes.splice(originalIndex, 1);
  
          setOriginalRecipes(updatedRecipes);
          const updatedResults = updatedRecipes.map((recipe: any, originalIndex: number) => ({
            ...recipe,
            originalIndex,
          }));
          setResults(updatedResults);
  
          localStorage.setItem('recipes', JSON.stringify(updatedRecipes.reverse()));
          localStorage.setItem(
            'resultsOrder',
            JSON.stringify(updatedResults.map((item: any) => item.originalIndex))
          );
  
          setIsDeleteAlertOpen(false);

        } else {
          console.error('Invalid recipe index:', originalIndex);
        }
      } else {
        console.error('Invalid recipe index:', Index);
      }
    } else {
      
  
      if (Index >= 0 && Index < updatedRecipes.length) {
        const originalIndex = resultsOrder[Index];
  
        if (originalIndex >= 0 && originalIndex < updatedRecipes.length) {
          updatedRecipes.splice(originalIndex, 1);
  
          setOriginalRecipes(updatedRecipes);
          const updatedResults = updatedRecipes.map((recipe: any, originalIndex: number) => ({
            ...recipe,
            originalIndex,
          }));
          setResults(updatedResults);
  
          localStorage.setItem('recipes', JSON.stringify(updatedRecipes.reverse()));
          localStorage.setItem(
            'resultsOrder',
            JSON.stringify(updatedResults.map((item: any) => item.originalIndex))
          );
  
          setIsDeleteAlertOpen(false);
        } else {
          console.error('Invalid recipe index:', originalIndex);
        }
      } else {
        console.error('Invalid recipe index:', Index);
      }
    }
    window.location.reload();
  };
// localStorage.clear();
  const [originalRecipes, setOriginalRecipes] = useState([]);
  let [results, setResults] = useState([...recipes].reverse());
  
  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    setOriginalRecipes(recipes.reverse());
    const resultsWithIndex = recipes.map((recipe: any, originalIndex: any) => ({
      ...recipe,
      originalIndex,
    }));
    setResults(resultsWithIndex);
  }, []);

  const handleInput = (ev: CustomEvent) => {
    const query = (ev.detail.value as string).toLowerCase();
    
    setResults(
      recipes
        .map((recipe: any, originalIndex: number) => ({ ...recipe, originalIndex }))
        .filter((recipe: any) =>
          recipe.name.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.instructions.toLowerCase().includes(query)
        )
        // .reverse()
    );
  };
  
  useEffect(() => {
    const backButtonHandler = () => {
      // Handle back button press
      // You can implement your custom logic here

      // Example: Close the app when the back button is pressed twice
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - (lastBackPressTime || 0);

      if (timeDifference < 1500) {
        // If the last back press was within 2 seconds, close the app
        App.exitApp();
      } else {
        // If the last back press was more than 2 seconds ago, update the lastBackPressTime
        lastBackPressTime = currentTime;
      }
    };

    let lastBackPressTime: number | null = null;

    // Add the back button listener
    App.addListener('backButton', backButtonHandler);

    // Remove the listener when the component is unmounted
    return () => {
      App.removeAllListeners();
    };
  }, []);

  // const handleEnterKey = (
  //   e: React.KeyboardEvent<HTMLIonTextareaElement>
  // ) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     // Handle the Enter key press
  //     e.preventDefault();
  //     // Your logic to add a number at the beginning of the new line
  //     // ...
  //     console.log("Enter pressed");
  //   }
  // };
  
  // onKeyDown={(e: React.KeyboardEvent<HTMLIonTextareaElement>) =>
  //   handleEnterKey(e)
  // }
  
  // const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
  //   // Update the order of the results based on the event detail
  //   setResults((results) => {
  //     const newResults = [...results];
  //     const movedItem = newResults.splice(event.detail.from, 1)[0];
  //     newResults.splice(event.detail.to, 0, movedItem);
  
  //     // Save the new order to local storage
  //     localStorage.setItem('resultsOrder', JSON.stringify(newResults.map((item) => item.originalIndex)));
  
  //     return newResults;
  //   });
  
  //   // Call the ionItemReorderComplete method to finish the reorder process
  //   event.detail.complete();
  // };
  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    const { from, to } = event.detail;
  
    // Update the order of the results based on the event detail
    setResults((results) => {
      const newResults = [...results];
      const [movedItem] = newResults.splice(from, 1);
      newResults.splice(to, 0, movedItem);
  
      // Save the new order to local storage
      localStorage.setItem('resultsOrder', JSON.stringify(newResults.map((item) => item.originalIndex)));
  
      return newResults;
    });
  
    // Call the ionItemReorderComplete method to finish the reorder process
    event.detail.complete();
  };
  
  useEffect(() => {
    const resultsOrder = JSON.parse(localStorage.getItem('resultsOrder') || '[]');
    setResults((results) =>
      resultsOrder.map((originalIndex: number) =>
        results.find((item: { originalIndex: number }) => item.originalIndex === originalIndex)
      )
    );
  }, []);
  
  // const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
  //   setResults((results) => {
  //     const newResults = [...results].reverse();
  //     const movedItem = newResults.splice(event.detail.from, 1)[0];
  //     newResults.splice(event.detail.to, 0, movedItem);
  
  //     localStorage.setItem('resultsOrder', JSON.stringify(newResults.map((item) => item.originalIndex)));
  //     localStorage.setItem('recipes', JSON.stringify(newResults.reverse())); // Add this line to save the reordered list
  //     return newResults;
  //   });
  //   event.detail.complete();
  // };

  // useEffect(() => {
  //   const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
  //   const resultsWithIndex = recipes.map((recipe: any, originalIndex: number) => ({ ...recipe, originalIndex }));
  //   setResults(resultsWithIndex);
  // }, []);

  // useEffect(() => {
  //   const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
  //   setOriginalRecipes(recipes.reverse());

  //   const resultsOrder = JSON.parse(localStorage.getItem('resultsOrder') || '[]');
  //   const resultsWithIndex = recipes.map((recipe: any, originalIndex: number) => ({
  //     ...recipe,
  //     originalIndex,
  //   }));
  //   const reorderedResults = resultsOrder.map((originalIndex: number) => resultsWithIndex.find((item: { originalIndex: number; }) => item.originalIndex === originalIndex));
  //   setResults(reorderedResults);
  // }, []);
// localStorage.clear();
  const deletePhoto = () => {
    setImageSrc('/assets/food.jpg');
  }

  return (
    <>
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inne ustawienia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonToggle checked={themeToggle} onIonChange={toggleChange} justify="space-between">
            Ciemny motyw
          </IonToggle>
        </IonItem>
        <IonItem onClick={() => App.exitApp()}>
          Wyjdź z aplikacji
          <IonIcon aria-hidden="true" slot="end" src="/assets/exit-outline.svg"></IonIcon>
        </IonItem>
      </IonContent>
    </IonMenu>
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol size="auto">
                <IonMenuButton></IonMenuButton>
              </IonCol>
              <IonCol>
                <IonSearchbar
                  placeholder="Wyszukaj"
                  spellCheck={true}
                  debounce={1000}
                  autocorrect="on"
                  onIonInput={(ev) => handleInput(ev)}
                ></IonSearchbar>
              </IonCol>
              {/* <IonCol size="auto">
                <IonButton style={{marginTop: '5px'}} aria-label="Favorite" onClick={() => App.exitApp()}>
                  <IonIcon aria-hidden="true" slot="icon-only" src="/assets/exit-outline.svg"></IonIcon>
                </IonButton>
              </IonCol> */}
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{position: 'relative', textAlign: 'center', top: '20px'}}>
          <IonButton id="open-modal">Dodaj przepisy</IonButton>
        </div>
        <div style={{marginTop:'20px'}}></div>
        <IonGrid>
          {/* <IonRow>
            <IonCol size='auto'>
              <IonCard >
                <img alt="Image" src="https://picsum.photos/400/300" />
                <IonCardHeader>
                  <IonCardTitle>Card Title</IonCardTitle>
                  <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size='auto'>
              <IonCard >
                <img alt="Image" src="https://picsum.photos/400/300" />
                <IonCardHeader>
                  <IonCardTitle>Card Title</IonCardTitle>
                  <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size='auto'>
              <IonCard>
                <img alt="Image" src="https://picsum.photos/400/300" />
                <IonCardHeader>
                  <IonCardTitle>Card Title</IonCardTitle>
                  <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow> */}
          <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton onClick={() => modal.current?.dismiss()}>Anuluj</IonButton>
                </IonButtons>
                <div style={{textAlign: 'center', marginLeft:'25px'}}>
                  <IonTitle>Przepis</IonTitle>
                </div>
                <IonButtons slot="end">
                  <IonButton strong={true} onClick={() => confirm()}>
                    Potwierdź
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonItem>
                <IonInput
                  clearInput={true}
                  spellcheck={true}
                  autocapitalize='on'
                  autocorrect='on'
                  label="Nazwa potrawy"
                  labelPlacement="stacked"
                  ref={input}
                  type="text"
                  placeholder="Wprowadź tekst"
                  value={recipeName}
                  onIonInput={handleRecipeNameChange}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  clearInput={true}
                  spellcheck={true}
                  autocorrect='on'
                  autocapitalize='on'
                  label="Opis potrawy"
                  labelPlacement="stacked"
                  ref={input}
                  type="text"
                  placeholder="Wprowadź tekst"
                  value={recipeDescription}
                  onIonInput={handleRecipeDescriptionChange}
                />
              </IonItem>
              <IonItem>
                <IonTextarea
                  // autoCorrect='on'
                  label="Przepis"
                  labelPlacement="stacked"
                  autocapitalize='on'
                  // ref={input}
                  // type="text"
                  autoGrow={true}
                  placeholder="Wprowadź tekst"
                  value={recipeInstructions}
                  onIonInput={handleRecipeInstructionsChange}
                />
              </IonItem>
              <IonGrid style={{paddingLeft: '0px', paddingRight: '0px'}}>
                <IonRow>
                  <IonCol style={{paddingLeft: '0px', paddingRight: '0px'}}>
                    <IonButton expand="block" onClick={() => getPhoto()}>Wybierz zdjęcie potrawy</IonButton>
                  </IonCol>
                  <IonCol size="auto" style={{paddingRight: '0px'}}>
                    <IonButton style={{paddingRight: '0px'}} onClick={() => deletePhoto()}>X</IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
              {/* <IonButton style={{marginTop: '10px', marginBottom: '10px'}} expand="block" onClick={() => getPhoto()}>Wybierz zdjęcie potrawy</IonButton> */}
              {imageSrc && imageSrc !== '/assets/food.jpg' && (
                <img style={{ textAlign: 'center' }} src={imageSrc} width={400} height={300} alt="Image" />
              )}
            </IonContent>
          </IonModal>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
          {results.length > 0 && (results.map((recipe: any) => (
            <IonRow key={recipe.name}>
              <IonCol size="auto" >
                <IonCard onClick={() => PassIndex(results.indexOf(recipe))} onContextMenu={() => DeleteCard(results.indexOf(recipe))}>
                  <IonReorder style={{position: "absolute", right: "2px"}}/>
                  <img alt="Image" src={recipe.image} width={400} height={300} />
                  <IonCardHeader>
                    <IonCardTitle>{recipe.name}</IonCardTitle>
                    <IonCardSubtitle>{recipe.description}</IonCardSubtitle>
                  </IonCardHeader>
                  {/*style={{ whiteSpace: 'pre-line' }} pozwoli zachować zrobioną nową linię*/}
                  <IonCardContent>
                    {recipe.instructions.length > 100 ? `${recipe.instructions.substr(0, 100)}...` : recipe.instructions}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          )))}
          </IonReorderGroup>
          {!results.length && 
          <div className='ion-text-center' style={{marginTop: '150px', fontSize: '20px'}}>
            <div className='ion-padding'>
              <IonLabel color={'danger'}>Brak przepisów</IonLabel>
            </div>
            <IonLabel>Aby dodać przepis kliknij powyższy przycisk "Dodaj Przepisy"</IonLabel>
          </div>
          }
        </IonGrid>
        {recipes.length > 0 && (
          <><EditModal /><OpenCardModal /></>
        )}
        <IonAlert
          header="Czy na pewno chcesz usunąć przepis?"
          buttons={[
            {
              text: 'Nie',
            },
            {
              text: 'Tak',
              handler: handleDeleteConfirmation
            },
          ]}
          isOpen={isDeleteAlertOpen}
          onDidDismiss={() => setIsDeleteAlertOpen(false)}
        ></IonAlert>
        <IonToast color={'danger'} isOpen={Duplicate} message="Nazwa przepisu jest już używana. Wybierz unikalną nazwę." onDidDismiss={() => setDuplicate(false)} duration={5000}></IonToast>
      </IonContent>
    </IonPage>
    </>
  );
};

export default Tab1;
