'use client';

import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';

type Language = 'eu' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const translations = {
  eu: {
    // Header
    'header.title': 'Rally Klasikoak',
    'header.login': 'Saioa Hasi',
    'header.register': 'Erregistratu',
    'header.cart': 'Erosketa saskia',
    'header.my_account': 'Nire Kontua',
    'header.logout': 'Saioa Itxi',
    'header.change_language': 'Hizkuntza aldatu',

    // Footer
    'footer.about_title': 'Rally Klasikoak',
    'footer.about_text': 'B taldeko eta rallyko ikono mitikoenak. Zure grina, gure motorra.',
    'footer.help_title': 'Laguntza',
    'footer.faq': 'Galdera ohikoenak',
    'footer.shipping': 'Bidalketa politikak',
    'footer.returns': 'Itzulketa politika',
    'footer.privacy': 'Pribatutasun politika',
    'footer.contact_title': 'Kontaktua',
    'footer.contact_email': 'info@rallyklasikoak.eus',
    'footer.follow_us': 'Jarrai gaitzazu',
    'footer.copyright': 'Eskubide guztiak erreserbatuta.',

    // Home
    'home.hero_title': 'Rally Klasikoak',
    'home.hero_subtitle': 'B taldeko eta rallyko ikono mitikoenak. Zure grina, gure motorra.',
    'home.explore_collection': 'Arakatu Bilduma',
    'home.our_treasures': 'Gure Altxorrak',

    // Product Card & Details
    'product.add_to_cart': 'Saskira Gehitu',
    'product.added_to_cart_title': 'Saskira gehituta',
    'product.added_to_cart_description': '{quantity} x {name} saskian sartu da.',
    
    // Cart
    'cart.title': 'Erosketa Saskia',
    'cart.empty': 'Zure saskia hutsik dago.',
    'cart.continue_shopping': 'Jarraitu Eosten',
    'cart.product': 'Produktua',
    'cart.price': 'Prezioa',
    'cart.quantity': 'Kopurua',
    'cart.total': 'Guztira',
    'cart.summary_title': 'Eskaeraren Laburpena',
    'cart.subtotal': 'Subtotala',
    'cart.shipping': 'Bidalketa',
    'cart.shipping_calculated': 'Kalkulatzeko',
    'cart.grand_total': 'Guztira',
    'cart.proceed_to_checkout': 'Jarraitu Ordainketarekin',

    // Checkout
    'checkout.title': 'Ordainketa',
    'checkout.processing_payment_title': 'Ordainketa prozesatzen...',
    'checkout.processing_payment_description': 'Zure eskaera prestatzen ari gara.',
    'checkout.error_saving_order_title': 'Errorea eskaera gordetzean',
    'checkout.error_saving_order_description': 'Ezin izan da zure eskaera gorde. Saiatu berriro.',
    'checkout.login_required_error': 'Saioa hasi behar duzu eskaera egiteko.',
    'checkout.shipping_address': 'Bidalketa Helbidea',
    'checkout.first_name': 'Izena',
    'checkout.last_name': 'Abizenak',
    'checkout.address': 'Helbidea',
    'checkout.city': 'Hiria',
    'checkout.zip_code': 'Posta Kodea',
    'checkout.payment_details': 'Ordainketa Xehetasunak',
    'checkout.card_number': 'Txartel Zenbakia',
    'checkout.expiry_date': 'Iraungitze Data',
    'checkout.cvc': 'CVC',
    'checkout.your_order': 'Zure Eskaera',
    'checkout.quantity_short': 'Kopurua: {quantity}',
    'checkout.confirm_order': 'Eskaera Berretsi',
    'checkout.loading': 'Kargatzen...',
    
    // Order Success
    'ordersuccess.title': 'Eskerrik asko!',
    'ordersuccess.description': 'Zure eskaera behar bezala jaso da. Laster mezu elektroniko bat jasoko duzu xehetasunekin.',
    'ordersuccess.back_to_home': 'Hasierara Itzuli',

    // Account
    'account.title': 'Nire Kontua',
    'account.loading': 'Kargatzen...',
    'account.profile_info': 'Profilaren informazioa',
    'account.full_name': 'Izen-abizenak',
    'account.email': 'Helbide elektronikoa',
    'account.order_history': 'Eskaeren historia',
    'account.no_orders': 'Oraindik ez duzu eskaerarik egin.',

    // Login
    'login.title': 'Saioa Hasi',
    'login.description': 'Sartu zure helbide elektronikoa zure kontuan sartzeko.',
    'login.email_invalid': 'Helbide elektroniko baliogabea.',
    'login.password_empty': 'Pasahitza ezin da hutsik egon.',
    'login.welcome_title': 'Ongi etorri!',
    'login.welcome_description': 'Saioa ondo hasi duzu.',
    'login.error_title': 'Errorea saioa hastean',
    'login.error_description': 'Helbide elektronikoa edo pasahitza ez da zuzena.',
    'login.email_label': 'Helbide elektronikoa',
    'login.password_label': 'Pasahitza',
    'login.forgot_password': 'Pasahitza ahaztu duzu?',
    'login.submit_button': 'Saioa Hasi',
    'login.submitting_button': 'Sartzen...',
    'login.no_account': 'Ez duzu konturik?',
    'login.register_link': 'Erregistratu',
    
    // Register
    'register.title': 'Sortu kontu bat',
    'register.description': 'Sartu zure informazioa kontu berri bat sortzeko.',
    'register.first_name_required': 'Izena beharrezkoa da.',
    'register.last_name_required': 'Abizena beharrezkoa da.',
    'register.password_length': 'Pasahitzak gutxienez 6 karaktere izan behar ditu.',
    'register.success_title': 'Erregistroa osatuta',
    'register.success_description': 'Zure kontua behar bezala sortu da. Saioa hasi dezakezu orain.',
    'register.error_title': 'Errorea erregistratzean',
    'register.error_description': 'Ezin izan da kontua sortu. Baliteke emaila jada erabilita egotea.',
    'register.first_name_label': 'Izena',
    'register.last_name_label': 'Abizena',
    'register.password_label': 'Pasahitza',
    'register.submit_button': 'Kontua Sortu',
    'register.submitting_button': 'Sortzen...',
    'register.has_account': 'Baduzu kontua?',
    'register.login_link': 'Saioa Hasi',
    
    // Forgot Password
    'forgotpassword.title': 'Pasahitza Berreskuratu',
    'forgotpassword.description': 'Sartu zure helbide elektronikoa eta pasahitza berrezartzeko esteka bat bidaliko dizugu.',
    'forgotpassword.success_title': 'Berrezartzeko esteka bidalita',
    'forgotpassword.success_description': 'Mezu elektroniko bat bidali dugu zure pasahitza berrezartzeko argibideekin.',
    'forgotpassword.submit_button': 'Berrezartzeko esteka bidali',
    'forgotpassword.submitting_button': 'Bidalten...',
    
    // FAQ
    'faq.title': 'Galdera Ohikoenak',
    'faq.q1': 'Zein ordainketa-metodo onartzen dituzue?',
    'faq.a1': 'Kreditu- eta zordunketa-txartel nagusiak (Visa, MasterCard, American Express) onartzen ditugu, baita PayPal bidezko ordainketak ere.',
    'faq.q2': 'Nazioartera bidaltzen duzue?',
    'faq.a2': 'Bai, mundu osora bidaltzen dugu. Bidalketa-gastuak eta -denborak zure kokapenaren arabera aldatuko dira. Informazio gehiago gure Bidalketa Politiketan aurki dezakezu.',
    'faq.q3': 'Zenbat denbora behar du nire eskaerak iristeko?',
    'faq.a3': 'Eskaerak 1-2 lanegunetan prozesatzen dira. Bidalketa-denborak aldatu egiten dira helmugaren arabera. Espainian, 3-5 lanegun inguru behar izaten ditu. Nazioarteko bidalketek 7-21 egun har ditzakete.',
    'faq.q4': 'Auto bat itzul dezaket?',
    'faq.a4': 'Bai, itzulketak onartzen ditugu eskaera jaso eta 14 eguneko epean. Autoak jaso zenuen egoera berean egon behar du. Mesedez, kontsultatu gure Itzulketa Politika xehetasun gehiagorako.',
    'faq.q5': 'Autoak benetakoak al dira edo erreplikak?',
    'faq.a5': 'Gure bildumako auto gehienak jatorrizko modelo zaharberrituak dira. Produktu bakoitzaren deskribapenean autoaren jatorriari eta historiari buruzko xehetasunak ematen ditugu. Erreplikarik badago, argi eta garbi adierazten da.',
    
    // Privacy Policy
    'privacy.title': 'Pribatutasun Politika',
    'privacy.q1': 'Zer informazio biltzen dugu?',
    'privacy.a1_1': 'Zuregandik informazioa biltzen dugu gure webgunean erregistratzen zarenean, eskaera bat egiten duzunean edo gure buletinean harpidetzen zarenean.',
    'privacy.a1_2': 'Eskaera edo erregistroa egitean, dagokion moduan, zure izena, helbide elektronikoa, posta-helbidea edo telefono-zenbakia eska dakizuke. Hala ere, gure webgunea modu anonimoan bisita dezakezu.',
    'privacy.q2': 'Zertarako erabiltzen dugu zure informazioa?',
    'privacy.a2_1': 'Biltzen dugun informazioa helburu hauetarako erabil daiteke:',
    'privacy.l1': 'Zure esperientzia pertsonalizatzeko',
    'privacy.l2': 'Gure webgunea hobetzeko',
    'privacy.l3': 'Bezeroarentzako zerbitzua hobetzeko',
    'privacy.l4': 'Transakzioak prozesatzeko',
    'privacy.l5': 'Aldizkako mezu elektronikoak bidaltzeko',
    'privacy.q3': 'Nola babesten dugu zure informazioa?',
    'privacy.a3': 'Hainbat segurtasun-neurri ezartzen ditugu zure informazio pertsonalaren segurtasuna mantentzeko eskaera bat egiten duzunean edo zure informazio pertsonala sartu, bidali edo atzitzen duzunean.',
    'privacy.q4': 'Zure baimena',
    'privacy.a4': 'Gure webgunea erabiliz, gure pribatutasun-politika onartzen duzu.',

    // Return Policy
    'returns.title': 'Itzulketa Politika',
    'returns.q1': 'Gure Itzulketa Politika',
    'returns.a1_1': 'Zure erosketarekin guztiz pozik ez bazaude, pozik lagunduko dizugu. Itzulketak onartzen ditugu produktua jaso eta 14 eguneko epean.',
    'returns.a1_2': 'Itzulketa bat jasotzeko, artikuluak erabili gabe egon behar du eta jaso zenuen egoera berean. Jatorrizko ontzian ere egon behar du.',
    'returns.q2': 'Itzultze Prozesua',
    'returns.a2_1': 'Itzulketa bat hasteko, jarri gurekin harremanetan {email} helbidean zure eskaera-zenbakiarekin eta itzulketaren arrazoiarekin.',
    'returns.a2_2': 'Itzultzeko bidalketa-gastuak zure kontura izango dira. Bidalketa-gastuak ez dira itzulgarriak. Itzulketa bat jasotzen baduzu, itzultzeko bidalketaren kostua zure itzulketatik kenduko da.',
    'returns.q3': 'Itzulketak',
    'returns.a3_1': 'Zure itzulketa jaso eta ikuskatu ondoren, mezu elektroniko bat bidaliko dizugu itzulitako artikulua jaso dugula jakinarazteko. Zure itzulketaren onarpenaren edo ezespenaren berri ere emango dizugu.',
    'returns.a3_2': 'Onartzen bada, zure itzulketa prozesatuko da, eta kreditu bat automatikoki aplikatuko da zure jatorrizko ordainketa-metodoari, egun jakin batzuen buruan.',

    // Shipping Policy
    'shipping.title': 'Bidalketa Politikak',
    'shipping.q1': 'Prozesatzeko Denbora',
    'shipping.a1': 'Eskaera guztiak gure biltegitik 1-3 lanegunetan prozesatu eta bidaltzen dira. Asteburuetan edo jaiegunetan egindako eskaerak hurrengo lanegunean prozesatuko dira.',
    'shipping.q2': 'Bidalketa Tarifak eta Denborak',
    'shipping.a2_1': '<strong>Estatuko Bidalketa (Espainia):</strong> 5-7 lanegun. Bidalketa kostua pisuaren eta helmugaren arabera kalkulatuko da ordainketa-pantailan.',
    'shipping.a2_2': '<strong>Nazioarteko Bidalketa:</strong> 7-21 lanegun. Nazioarteko bidalketa-gastuek ez dituzte aduana-zergak edo zergak barne hartzen. Bezeroa da bere herrialdeko inportazio-gastuen erantzulea.',
    'shipping.a2_3': 'Autoen tamaina eta pisu berezia direla eta, bidalketa-gastuak nabarmen alda daitezke. Garraio espezializatua behar duten ibilgailuentzat, zurekin harremanetan jarriko gara logistika koordinatzeko.',
    'shipping.q3': 'Eskaeraren Jarraipena',
    'shipping.a3': 'Zure eskaera bidalitakoan, jarraipen-zenbaki bat duen mezu elektroniko bat jasoko duzu, paketearen bidaia jarraitu ahal izateko.',
    
  },
  fr: {
    // Header
    'header.title': 'Rallye Classiques',
    'header.login': 'Connexion',
    'header.register': 'S\'inscrire',
    'header.cart': 'Panier d\'achat',
    'header.my_account': 'Mon Compte',
    'header.logout': 'Déconnexion',
    'header.change_language': 'Changer de langue',

    // Footer
    'footer.about_title': 'Rallye Classiques',
    'footer.about_text': 'Les icônes les plus mythiques du Groupe B et du rallye. Votre passion, notre moteur.',
    'footer.help_title': 'Aide',
    'footer.faq': 'Questions fréquentes',
    'footer.shipping': 'Politique d\'expédition',
    'footer.returns': 'Politique de retour',
    'footer.privacy': 'Politique de confidentialité',
    'footer.contact_title': 'Contact',
    'footer.contact_email': 'info@rallyeclassiques.fr',
    'footer.follow_us': 'Suivez-nous',
    'footer.copyright': 'Tous droits réservés.',

    // Home
    'home.hero_title': 'Rallye Classiques',
    'home.hero_subtitle': 'Les icônes les plus mythiques du Groupe B et du rallye. Votre passion, notre moteur.',
    'home.explore_collection': 'Explorer la Collection',
    'home.our_treasures': 'Nos Trésors',

    // Product Card & Details
    'product.add_to_cart': 'Ajouter au Panier',
    'product.added_to_cart_title': 'Ajouté au panier',
    'product.added_to_cart_description': '{quantity} x {name} a été ajouté à votre panier.',

    // Cart
    'cart.title': 'Panier d\'Achat',
    'cart.empty': 'Votre panier est vide.',
    'cart.continue_shopping': 'Continuer les Achats',
    'cart.product': 'Produit',
    'cart.price': 'Prix',
    'cart.quantity': 'Quantité',
    'cart.total': 'Total',
    'cart.summary_title': 'Résumé de la Commande',
    'cart.subtotal': 'Sous-total',
    'cart.shipping': 'Livraison',
    'cart.shipping_calculated': 'À calculer',
    'cart.grand_total': 'Total',
    'cart.proceed_to_checkout': 'Passer à la Caisse',

    // Checkout
    'checkout.title': 'Paiement',
    'checkout.processing_payment_title': 'Traitement du paiement...',
    'checkout.processing_payment_description': 'Nous préparons votre commande.',
    'checkout.error_saving_order_title': 'Erreur lors de l\'enregistrement de la commande',
    'checkout.error_saving_order_description': 'Impossible de sauvegarder votre commande. Veuillez réessayer.',
    'checkout.login_required_error': 'Vous devez être connecté pour passer une commande.',
    'checkout.shipping_address': 'Adresse de Livraison',
    'checkout.first_name': 'Prénom',
    'checkout.last_name': 'Nom',
    'checkout.address': 'Adresse',
    'checkout.city': 'Ville',
    'checkout.zip_code': 'Code Postal',
    'checkout.payment_details': 'Détails de Paiement',
    'checkout.card_number': 'Numéro de Carte',
    'checkout.expiry_date': 'Date d\'Expiration',
    'checkout.cvc': 'CVC',
    'checkout.your_order': 'Votre Commande',
    'checkout.quantity_short': 'Qté: {quantity}',
    'checkout.confirm_order': 'Confirmer la Commande',
    'checkout.loading': 'Chargement...',

    // Order Success
    'ordersuccess.title': 'Merci !',
    'ordersuccess.description': 'Votre commande a été reçue avec succès. Vous recevrez bientôt un e-mail avec les détails.',
    'ordersuccess.back_to_home': 'Retour à l\'Accueil',

    // Account
    'account.title': 'Mon Compte',
    'account.loading': 'Chargement...',
    'account.profile_info': 'Informations du profil',
    'account.full_name': 'Nom complet',
    'account.email': 'Adresse e-mail',
    'account.order_history': 'Historique des commandes',
    'account.no_orders': 'Vous n\'avez pas encore passé de commande.',
    
    // Login
    'login.title': 'Connexion',
    'login.description': 'Entrez votre e-mail ci-dessous pour vous connecter à votre compte.',
    'login.email_invalid': 'Adresse e-mail invalide.',
    'login.password_empty': 'Le mot de passe ne peut pas être vide.',
    'login.welcome_title': 'Bienvenue !',
    'login.welcome_description': 'Vous vous êtes connecté avec succès.',
    'login.error_title': 'Erreur de connexion',
    'login.error_description': 'L\'adresse e-mail ou le mot de passe est incorrect.',
    'login.email_label': 'Adresse e-mail',
    'login.password_label': 'Mot de passe',
    'login.forgot_password': 'Mot de passe oublié ?',
    'login.submit_button': 'Connexion',
    'login.submitting_button': 'Connexion en cours...',
    'login.no_account': 'Vous n\'avez pas de compte ?',
    'login.register_link': 'S\'inscrire',
    
    // Register
    'register.title': 'Créer un compte',
    'register.description': 'Entrez vos informations pour créer un compte.',
    'register.first_name_required': 'Le prénom est requis.',
    'register.last_name_required': 'Le nom est requis.',
    'register.password_length': 'Le mot de passe doit comporter au moins 6 caractères.',
    'register.success_title': 'Inscription terminée',
    'register.success_description': 'Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.',
    'register.error_title': 'Erreur lors de l\'inscription',
    'register.error_description': 'Impossible de créer le compte. L\'e-mail est peut-être déjà utilisé.',
    'register.first_name_label': 'Prénom',
    'register.last_name_label': 'Nom',
    'register.password_label': 'Mot de passe',
    'register.submit_button': 'Créer un compte',
    'register.submitting_button': 'Création en cours...',
    'register.has_account': 'Vous avez déjà un compte ?',
    'register.login_link': 'Connexion',
    
    // Forgot Password
    'forgotpassword.title': 'Récupérer le mot de passe',
    'forgotpassword.description': 'Entrez votre e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.',
    'forgotpassword.success_title': 'Lien de réinitialisation envoyé',
    'forgotpassword.success_description': 'Nous avons envoyé un e-mail avec des instructions pour réinitialiser votre mot de passe.',
    'forgotpassword.submit_button': 'Envoyer le lien de réinitialisation',
    'forgotpassword.submitting_button': 'Envoi en cours...',

    // FAQ
    'faq.title': 'Questions Fréquemment Posées',
    'faq.q1': 'Quels modes de paiement acceptez-vous ?',
    'faq.a1': 'Nous acceptons les principales cartes de crédit et de débit (Visa, MasterCard, American Express), ainsi que les paiements via PayPal.',
    'faq.q2': 'Livrez-vous à l\'international ?',
    'faq.a2': 'Oui, nous livrons dans le monde entier. Les frais et délais de livraison varient en fonction de votre emplacement. Vous trouverez plus d\'informations dans notre Politique d\'Expédition.',
    'faq.q3': 'Combien de temps faut-il pour que ma commande arrive ?',
    'faq.a3': 'Les commandes sont traitées dans un délai de 1 à 2 jours ouvrables. Les délais de livraison varient selon la destination. En France métropolitaine, cela prend environ 3-5 jours ouvrables. Les envois internationaux peuvent prendre de 7 à 21 jours.',
    'faq.q4': 'Puis-je retourner une voiture ?',
    'faq.a4': 'Oui, nous acceptons les retours dans les 14 jours suivant la réception de la commande. La voiture doit être dans le même état que vous l\'avez reçue. Veuillez consulter notre Politique de Retour pour plus de détails.',
    'faq.q5': 'Les voitures sont-elles authentiques ou des répliques ?',
    'faq.a5': 'La plupart des voitures de notre collection sont des modèles originaux restaurés. Nous fournissons des détails sur l\'origine et l\'histoire de la voiture dans la description de chaque produit. Si une réplique existe, elle est clairement indiquée.',
    
    // Privacy Policy
    'privacy.title': 'Politique de Confidentialité',
    'privacy.q1': 'Quelles informations collectons-nous ?',
    'privacy.a1_1': 'Nous collectons des informations auprès de vous lorsque vous vous inscrivez sur notre site, passez une commande ou vous abonnez à notre newsletter.',
    'privacy.a1_2': 'Lors de la commande ou de l\'inscription, le cas échéant, il peut vous être demandé d\'entrer votre nom, votre adresse e-mail, votre adresse postale ou votre numéro de téléphone. Vous pouvez, cependant, visiter notre site de manière anonyme.',
    'privacy.q2': 'À quoi nous servent vos informations ?',
    'privacy.a2_1': 'Toutes les informations que nous collectons auprès de vous peuvent être utilisées de l\'une des manières suivantes :',
    'privacy.l1': 'Pour personnaliser votre expérience',
    'privacy.l2': 'Pour améliorer notre site web',
    'privacy.l3': 'Pour améliorer le service client',
    'privacy.l4': 'Pour traiter les transactions',
    'privacy.l5': 'Pour envoyer des e-mails périodiques',
    'privacy.q3': 'Comment protégeons-nous vos informations ?',
    'privacy.a3': 'Nous mettons en œuvre une variété de mesures de sécurité pour maintenir la sécurité de vos informations personnelles lorsque vous passez une commande ou que vous entrez, soumettez ou accédez à vos informations personnelles.',
    'privacy.q4': 'Votre consentement',
    'privacy.a4': 'En utilisant notre site, vous consentez à notre politique de confidentialité.',

    // Return Policy
    'returns.title': 'Politique de Retour',
    'returns.q1': 'Notre Politique de Retour',
    'returns.a1_1': 'Si vous n\'êtes pas entièrement satisfait de votre achat, nous sommes là pour vous aider. Nous acceptons les retours dans les 14 jours suivant la réception du produit.',
    'returns.a1_2': 'Pour être éligible à un retour, votre article doit être inutilisé et dans le même état que vous l\'avez reçu. Il doit également être dans son emballage d\'origine.',
    'returns.q2': 'Processus de Retour',
    'returns.a2_1': 'Pour initier un retour, veuillez nous contacter à {email} avec votre numéro de commande et la raison du retour.',
    'returns.a2_2': 'Vous serez responsable du paiement de vos propres frais d\'expédition pour le retour de votre article. Les frais d\'expédition ne sont pas remboursables. Si vous recevez un remboursement, le coût de l\'expédition de retour sera déduit de votre remboursement.',
    'returns.q3': 'Remboursements',
    'returns.a3_1': 'Une fois que nous aurons reçu et inspecté votre retour, nous vous enverrons un e-mail pour vous informer que nous avons reçu votre article retourné. Nous vous informerons également de l\'approbation ou du rejet de votre remboursement.',
    'returns.a3_2': 'S\'il est approuvé, votre remboursement sera traité et un crédit sera automatiquement appliqué à votre mode de paiement original, dans un certain nombre de jours.',

    // Shipping Policy
    'shipping.title': 'Politique d\'Expédition',
    'shipping.q1': 'Temps de Traitement',
    'shipping.a1': 'Toutes les commandes sont traitées et expédiées depuis notre entrepôt dans un délai de 1 à 3 jours ouvrables. Les commandes passées le week-end ou les jours fériés seront traitées le jour ouvrable suivant.',
    'shipping.q2': 'Tarifs et Délais de Livraison',
    'shipping.a2_1': '<strong>Livraison Nationale (France):</strong> 5-7 jours ouvrables. Les frais de port seront calculés en fonction du poids et de la destination lors du paiement.',
    'shipping.a2_2': '<strong>Livraison Internationale:</strong> 7-21 jours ouvrables. Les frais de livraison internationaux n\'incluent pas les droits de douane ou taxes. Le client est responsable de tous les frais d\'importation dans son pays.',
    'shipping.a2_3': 'En raison de la taille et du poids uniques des voitures, les frais de livraison peuvent varier considérablement. Pour les véhicules nécessitant un transport spécialisé, nous vous contacterons pour coordonner la logistique.',
    'shipping.q3': 'Suivi de Commande',
    'shipping.a3': 'Une fois votre commande expédiée, vous recevrez un e-mail de confirmation d\'expédition contenant votre ou vos numéros de suivi.',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('eu');

  useEffect(() => {
    try {
        const storedLang = localStorage.getItem('rally-lang') as Language | null;
        if (storedLang && (storedLang === 'eu' || storedLang === 'fr')) {
            setLanguage(storedLang);
            document.documentElement.lang = storedLang;
        } else {
            document.documentElement.lang = language;
        }
    } catch (error) {
        console.error("Failed to access localStorage", error);
        document.documentElement.lang = language;
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
        localStorage.setItem('rally-lang', lang);
        document.documentElement.lang = lang;
    } catch (error) {
        console.error("Failed to access localStorage", error);
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
            // Fallback to default language (eu) if key not found in current language
            let fallbackResult: any = translations.eu;
            for (const fk of keys) {
                fallbackResult = fallbackResult?.[fk];
            }
            return fallbackResult || key;
        }
    }
    return result || key;
  };

  const value = { language, setLanguage: handleSetLanguage, t };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === null) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
