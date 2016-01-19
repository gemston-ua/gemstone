<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Product;
use AppBundle\Form\ProductType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
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

        return $this->render('product/list.html.twig', ['products' => $products]);
    }

    /**
     * @Route("/{id}", name="products_show", requirements={"id" = "\d+"})
     */
    public function showAction(Product $product)
    {
        return new JsonResponse($product);
    }

    /**
     * @Route("/new", name="products_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $product = new Product();
        $form = $this->createForm(ProductType::class, $product);
        $form->add('save', SubmitType::class);

        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($product);
            $em->flush();

            $this->addFlash('success', 'Product was saved.');

            return $this->redirectToRoute("products_list");
        }


        return $this->render('product/new.html.twig', ['form' => $form->createView()]);
    }
}