<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Category;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/categories")
 */
class CategoryController extends Controller
{
    /**
     * @Route("/", name="categories_list")
     * @Method({"GET"})
     */
    public function listAction(Request $request)
    {
        $categories = $this->getDoctrine()->getRepository('AppBundle:Category')->findAll();

        return new JsonResponse(['categories' => $categories]);
    }
}