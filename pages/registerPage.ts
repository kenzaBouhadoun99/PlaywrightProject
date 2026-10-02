import { Page } from '@playwright/test';

export async function ouvrirFormulaire(page: Page) {
  await page.goto('/fr/user/register');

  const form = page.locator('#user-form');

  await form.waitFor({
    state: 'visible'
  });
}


export async function remplirInformationsCommunes(
  page: Page,
  data: any
) {

  // cibler UNIQUEMENT le formulaire d'inscription
  const form = page.locator('#user-form');

  // Email
  await form.locator('#edit-name').fill(data.email);

  // Mot de passe
  await form.locator('#edit-pass-pass1').fill(data.password);

  // Confirmation du mot de passe
  await form.locator('#edit-pass-pass2').fill(data.password);

  // Nom
  await form.locator('#edit-field-nom-0-value').fill(data.nom);

  // Prénom
  await form.locator('#edit-field-prenom-0-value').fill(data.prenom);

  // Code postal
  await form.locator('#edit-field-code-postal-0-value').fill(data.codePostal);

  // Ville
  await form.locator('#edit-field-ville-0-value').fill(data.ville);

  // Téléphone
  await form.locator('#edit-field-telephone-0-value').fill(data.telephone);
}


export async function choisirCivilite(
  page: Page,
  civilite: string
) {
  const form = page.locator('#user-form');

  if (civilite === 'M') {

    await form
      .locator('label[for="edit-field-civilite-mr"]')
      .click({ force: true });

  } else if (civilite === 'Mme') {

    await form
      .locator('label[for="edit-field-civilite-mme"]')
      .click({ force: true });

  } else {

    throw new Error(`Civilité inconnue : ${civilite}`);

  }
}