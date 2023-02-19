<?php

namespace App\Controller;

use App\Model\KlientModel;
use App\Service\ExamService;
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
    public function createClient(Request $request, ExamService $examService): JsonResponse
    {
        $klientModel = $this->deserializeJsonRequest($request, KlientModel::class, ['parse']);
        dump($klientModel);die;
        // $name = $request->request->get('name');
        // $description = $request->request->get('description', '');

        // if (empty($name)) {
        //     return $this->redirectToRoute('exam_index', ['errors' => ['Proszę uzupełnić pole nazwy badania.']]);
        // }

        // $examService->createExam($name, $description);

        // return $this->redirectToRoute('exam_index');
        return new JsonResponse([
            'success' => true
        ]);
    }

    private function deserializeJsonRequest(Request $request, string $class, ?array $groups = null)
    {
        try {
            // dump($request->getContent());die;
            $data = $this->serializer->deserialize($request->getContent(), $class, 'json', ['groups' => $groups, 'disable_type_enforcement' => true]);
        } catch (Exception $e) {
            throw new Exception('Nieprawidłowy format danych. Error: ' . $e->getMessage());
        }

        return $data;
    }
}
