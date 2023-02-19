<?php

namespace App\Repository;

use App\Entity\Klient;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Klient>
 *
 * @method Klient|null find($id, $lockMode = null, $lockVersion = null)
 * @method Klient|null findOneBy(array $criteria, array $orderBy = null)
 * @method Klient[]    findAll()
 * @method Klient[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class KlientRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Klient::class);
    }

    public function add(Klient $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Klient $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
