<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

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

        return new JsonResponse(['products' => $products]);
    }
}