<?php
namespace App\Model;

use App\Entity\Client;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Type;

class ClientModel
{
      /**
       * @Groups({"parse"})
       * @NotBlank(groups={"parse"})
       * @Type("integer")
       *
       * @var int
       */
      private $lawState;

      /**
       * @Groups({"parse"})
       * @Type("string")
       *
       * @var string
       */
      private $nameSurname;

      /**
       * @Groups({"parse"})
       * @Type("string")
       *
       * @var string
       */
      private $company;

      /**
       * @Groups({"parse"})
       * @NotBlank(groups={"parse"})
       * @Type("string")
       *
       * @var string
       */
      private $street;

      /**
       * @Groups({"parse"})
       * @NotBlank(groups={"parse"})
       * @Type("string")
       *
       * @var string
       */
      private $homeNumber;

      /**
       * @Groups({"parse"})
       * @NotBlank(groups={"parse"})
       * @Type("string")
       *
       * @var string
       */
      private $city;

      /**
       * @Groups({"parse"})
       * @NotBlank(groups={"parse"})
       * @Type("string")
       *
       * @var string
       */
      private $postalCode;

      /**
       * @Groups({"parse"})
       * @NotBlank(groups={"parse"})
       * @Type("string")
       *
       * @var string
       */
      private $state;

      /**
       * @Groups({"parse"})
       * @NotBlank(groups={"parse"})
       * @Type("string")
       *
       * @var string
       */
      private $phonePrefix;

      /**
       * @Groups({"parse"})
       * @NotBlank(groups={"parse"})
       * @Type("string")
       *
       * @var string
       */
      private $phone;

      /**
       * @Groups({"parse"})
       * @NotBlank(groups={"parse"})
       * @Type("string")
       *
       * @var string
       */
      private $email;

      /**
       * @Groups({"parse"})
       * @Type("string")
       *
       * @var string
       */
      private $pesel;

      /**
       * @Groups({"parse"})
       * @Type("string")
       *
       * @var string
       */
      private $nip;

      public function getLawState(): int
      {
            return $this->lawState;
      }

      public function setLawState(int $lawState)
      {
            $this->lawState = $lawState;
      }

      public function getNameSurname(): string
      {
            return $this->nameSurname;
      }

      public function setNameSurname(string $nameSurname)
      {
            $this->nameSurname = $nameSurname;
      }

      public function getCompany(): string
      {
            return $this->company;
      }

      public function setCompany(string $company)
      {
            $this->company = $company;
      }

      public function getStreet(): string
      {
            return $this->street;
      }

      public function setStreet(string $street)
      {
            $this->street = $street;
      }

      public function getHomeNumber(): string
      {
            return $this->homeNumber;
      }

      public function setHomeNumber(string $homeNumber)
      {
            $this->homeNumber = $homeNumber;
      }

      public function getCity(): string
      {
            return $this->city;
      }

      public function setCity(string $city)
      {
            $this->city = $city;
      }

      public function getPostalCode(): string
      {
            return $this->postalCode;
      }

      public function setPostalCode(string $postalCode)
      {
            $this->postalCode = $postalCode;
      }

      public function getState(): string
      {
            return $this->state;
      }

      public function setState(string $state)
      {
            $this->state = $state;
      }

      public function getPhonePrefix(): string
      {
            return $this->phonePrefix;
      }

      public function setPhonePrefix(string $phonePrefix)
      {
            $this->phonePrefix = $phonePrefix;
      }

      public function getPhone(): string
      {
            return $this->phone;
      }

      public function setPhone(string $phone)
      {
            $this->phone = $phone;
      }

      public function getEmail(): string
      {
            return $this->email;
      }

      public function setEmail(string $email)
      {
            $this->email = $email;
      }

      public function getPesel(): string
      {
            return $this->pesel;
      }

      public function setPesel(string $pesel)
      {
            $this->pesel = $pesel;
      }

      public function getNip(): string
      {
            return $this->nip;
      }

      public function setNip(string $nip)
      {
            $this->nip = $nip;
      }

      public static function createInstanceFromClient(Client $client): self
      {
            $clientModel = new ClientModel();
            $clientModel->setLawState($client->getLawState());
            $clientModel->setNameSurname($client->getNameSurname());
            $clientModel->setCompany($client->getCompany());
            $clientModel->setStreet($client->getStreet());
            $clientModel->setHomeNumber($client->getHomeNumber());
            $clientModel->setCity($client->getCity());
            $clientModel->setPostalCode($client->getPostalCode());
            $clientModel->setState($client->getState());
            $clientModel->setPhonePrefix($client->getPhonePrefix());
            $clientModel->setPhone($client->getPhone());
            $clientModel->setEmail($client->getEmail());
            $clientModel->setPesel($client->getPesel());
            $clientModel->setNip($client->getNip());

            return $clientModel;
      }
}
