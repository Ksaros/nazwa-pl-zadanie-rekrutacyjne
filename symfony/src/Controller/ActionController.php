<?php

namespace App\Controller;

use App\Model\ClientModel;
use App\Service\ClientService;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ActionController extends AbstractController
{
    /** @var SerializerInterface */
    private $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    /**
     * @Route("/client/create", name="client_create", methods="POST")
     */
    public function createClient(Request $request, ClientService $clientService): JsonResponse
    {
        $clientModel = $this->deserializeJsonRequest($request, ClientModel::class, ['parse']);
        $result = $clientService->createClient($clientModel);

        if (is_array($result)) {
            return new JsonResponse([
                'success' => false,
                'data' => $result
            ], 400);
        }

        return new JsonResponse([
            'success' => true
        ]);
    }

    private function deserializeJsonRequest(Request $request, string $class, ?array $groups = null)
    {
        try {
            $data = $this->serializer->deserialize($request->getContent(), $class, 'json', ['groups' => $groups, 'disable_type_enforcement' => true]);
        } catch (Exception $e) {
            throw new Exception('Nieprawidłowy format danych. Error: ' . $e->getMessage());
        }

        return $data;
    }
}
