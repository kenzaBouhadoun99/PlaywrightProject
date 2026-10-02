import { test, expect } from '@playwright/test';
import fs from 'fs';

import {
  ouvrirFormulaire,
  remplirInformationsCommunes,
  choisirCivilite
} from '../pages/registerPage';


const data = JSON.parse(
  fs.readFileSync('./data/campusfrance-data.json', 'utf-8')
);


test.describe('Tests formulaire Campus France', () => {


  test('Verifier l’ouverture du formulaire', async ({ page }) => {

    await ouvrirFormulaire(page);

    const form = page.locator('#user-form');

    await expect(form).toBeVisible();

    //chercher les champs a remplir dans le formulaire 
    await expect(form.locator('#edit-name')).toBeVisible();

    await expect(
      form.locator('#edit-pass-pass1')
    ).toBeVisible();

    await expect(
      form.locator('#edit-pass-pass2')
    ).toBeVisible();

  });


  test('Remplir le profil Chercheur', async ({ page }) => {

    await ouvrirFormulaire(page);

    const chercheur = data.chercheur;

    await remplirInformationsCommunes(
      page,
      chercheur
    );

    await choisirCivilite(
      page,
      chercheur.civilite
    );

    const form = page.locator('#user-form');

    // Vérification des données saisies
    await expect(
      form.locator('#edit-name')
    ).toHaveValue(chercheur.email);

    await expect(
      form.locator('#edit-field-nom-0-value')
    ).toHaveValue(chercheur.nom);

    await expect(
      form.locator('#edit-field-prenom-0-value')
    ).toHaveValue(chercheur.prenom);

    await expect(
      form.locator('#edit-field-code-postal-0-value')
    ).toHaveValue(chercheur.codePostal);

    await expect(
      form.locator('#edit-field-ville-0-value')
    ).toHaveValue(chercheur.ville);

    await expect(
      form.locator('#edit-field-telephone-0-value')
    ).toHaveValue(chercheur.telephone);

  });


  test('Remplir le profil Institutionnel', async ({ page }) => {

    await ouvrirFormulaire(page);

    const institutionnel = data.institutionnel;

    await remplirInformationsCommunes(
      page,
      institutionnel
    );

    await choisirCivilite(
      page,
      institutionnel.civilite
    );

    const form = page.locator('#user-form');

    // Vérification des données saisies
    await expect(
      form.locator('#edit-name')
    ).toHaveValue(institutionnel.email);

    await expect(
      form.locator('#edit-field-nom-0-value')
    ).toHaveValue(institutionnel.nom);

    await expect(
      form.locator('#edit-field-prenom-0-value')
    ).toHaveValue(institutionnel.prenom);

  });

});