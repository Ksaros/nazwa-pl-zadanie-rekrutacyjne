<?php

namespace App\Service;

use App\Entity\Client;
use App\Model\ClientModel;
use App\Repository\ClientRepository;
use Doctrine\ORM\EntityManagerInterface;

class ClientService
{
    private $em;

    public function __construct(EntityManagerInterface $em) {
        $this->em = $em;
    }

    public function createClient(ClientModel $model)
    {
        $validationResult = $this->validateClientModel($model);
        if (!empty($validationResult)) {
            return $validationResult;
        }

        /** @var ClientRepository $clientRepository */
        $clientRepository = $this->em->getRepository(Client::class);
        $client = new Client();
        $client
            ->setLawState($model->getLawState())
            ->setNameSurname($model->getNameSurname())
            ->setCompany($model->getCompany())
            ->setStreet($model->getStreet())
            ->setHomeNumber($model->getHomeNumber())
            ->setCity($model->getCity())
            ->setPostalCode($model->getPostalCode())
            ->setState($model->getState())
            ->setPhonePrefix($model->getPhonePrefix())
            ->setPhone($model->getPhone())
            ->setEmail($model->getEmail())
            ->setPesel($model->getPesel())
            ->setNip($model->getNip());

        $clientRepository->add($client, true);
        return $client;
    }

    private function validateClientModel(ClientModel $model): array
    {
        $errors = [];
        /** @var ClientRepository $clientRepository */
        $clientRepository = $this->em->getRepository(Client::class);

        if (!in_array($model->getLawState(), ['0', '1'])) {
            $errors['lawState'] = 'Nieprawidłowa wartość statusu prawnego.';
        }

        if (!$model->getLawState() && empty($model->getNameSurname())) {
            $errors['nameSurname'] = 'Proszę uzupełnić pole Imię i Nazwisko.';
        }

        if (!$model->getLawState() && empty($model->getPesel())) {
            $errors['pesel'] = 'Proszę uzupełnić pole PESEL.';
        }

        if (!$model->getLawState() && !empty($model->getPesel()) && $clientRepository->findOneBy(['pesel' => $model->getPesel()]) instanceof Client) {
            $errors['pesel'] = 'Klient o takim numerze PESEL już istnieje.';
        }

        if ($model->getLawState() && empty($model->getCompany())) {
            $errors['company'] = 'Proszę uzupełnić pole Firma.';
        }

        if ($model->getLawState() && empty($model->getNip())) {
            $errors['nip'] = 'Proszę uzupełnić pole NIP.';
        }

        if ($model->getLawState() && !empty($model->getNip()) && $clientRepository->findOneBy(['nip' => $model->getNip()]) instanceof Client) {
            $errors['nip'] = 'Klient o takim numerze NIP już istnieje.';
        }

        if (empty($model->getStreet())) {
            $errors['street'] = 'Proszę uzupełnić pole Ulica.';
        }

        if (empty($model->getHomeNumber())) {
            $errors['homeNumber'] = 'Proszę uzupełnić pole Numer domu.';
        }

        if (empty($model->getCity())) {
            $errors['city'] = 'Proszę uzupełnić pole Miasto.';
        }

        if (empty($model->getPostalCode())) {
            $errors['postalCode'] = 'Proszę uzupełnić pole Kod pocztowy.';
        }

        if (empty($model->getState())) {
            $errors['state'] = 'Proszę uzupełnić pole Województwo.';
        }

        if (empty($model->getPhonePrefix())) {
            $errors['phonePrefix'] = 'Proszę uzupełnić pole Prefix numeru telefonu.';
        }

        if (empty($model->getPhone())) {
            $errors['phone'] = 'Proszę uzupełnić pole Numer telefonu.';
        }

        if (empty($model->getEmail())) {
            $errors['email'] = 'Proszę uzupełnić pole Email.';
        }

        if (!empty($model->getEmail()) && $clientRepository->findOneBy(['email' => $model->getEmail()]) instanceof Client) {
            $errors['email'] = 'Klient z takim adresem email już istnieje.';
        }

        return $errors;
    }
}
