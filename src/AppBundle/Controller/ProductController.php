<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Product;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @Route("/products")
 */
class ProductController extends Controller
{
    /**
     * @Route("/", name="products_list")
     * @Method({"GET"})
     */
    public function listAction()
    {
        $products = $this->getDoctrine()->getRepository('AppBundle:Product')->findAll();

        return ['products' => $products];
    }

    /**
     * @Route("/{id}", name="products_show", requirements={"id" = "\d+"})
     */
    public function showAction(Product $product)
    {
        return new JsonResponse($product);
    }
}