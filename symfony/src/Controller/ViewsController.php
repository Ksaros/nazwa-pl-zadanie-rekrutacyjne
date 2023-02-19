<?php

namespace App\Controller;

use App\Entity\Client;
use App\Model\ClientModel;
use App\Repository\ClientRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ViewsController extends AbstractController
{
    /**
     * @Route("/{reactRouting}", name="index", methods="GET", defaults={"reactRouting": null})
     * @Route("/client/{id}", name="get_client", methods="GET", defaults={"id": null})
     */
    public function index(): Response
    {
        return $this->render('front/index.html.twig');
    }

    /**
     * @Route("/json/{id}", name="client_json", methods="GET", defaults={"id": null})
     */
    public function clientJson(int $id, ClientRepository $clientRepository, SerializerInterface $serializer): JsonResponse
    {
        $client = $clientRepository->find($id);
        if (!$client instanceof Client) {
            return new JsonResponse([], 400);
        }

        return new JsonResponse($serializer->normalize(
            ClientModel::createInstanceFromClient($client),
            null,
            ['parse']
        ));
    }
}
