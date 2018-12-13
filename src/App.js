import React from 'react';

import ErrorBoundary from './Components/ErrorBoundary';


// import SearchBar from './Components/SearchBar';
// import ProductTable from './Components/ProductTable';

const SearchBar = React.lazy(() => import('./Components/SearchBar'));
const ProductTable = React.lazy(() => import('./Components/ProductTable'));


class FilterableProductTable extends React.Component {

    constructor(props) {
        super(props);

        this.onHandleSearch = this.onHandleSearch.bind(this);
        this.onToggleProductsWithZeroPoints = this.onToggleProductsWithZeroPoints.bind(this);

        this.state = {
            isHideProductsWithZeroPoints: false,
            searchTerm: ''
        };
    }


    onToggleProductsWithZeroPoints(event) {

        this.setState({
            isHideProductsWithZeroPoints: event.target.checked
        });
    }


    onHandleSearch(event) {

        this.setState({
            searchTerm: event.target.value
        });
    }


    render() {

        return (

            <React.Suspense fallback={<div>Loading...</div>}>

                <React.Fragment>

                    <ErrorBoundary>
                        <SearchBar
                            onHandleSearch={this.onHandleSearch}
                            onToggleProductsWithZeroPoints={this.onToggleProductsWithZeroPoints}
                        />
                    </ErrorBoundary>

                    <ProductTable
                        isHideProductsWithZeroPoints={this.state.isHideProductsWithZeroPoints}
                        products={WWPOINTS}
                        searchTerm={this.state.searchTerm}
                    />

                </React.Fragment>

            </React.Suspense>
        );
    }
}


/*
const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'},
    {category: 'Videos', price: '$19.99', stocked: true, name: 'Avengers: Infinity War'}
];
*/


const WWPOINTS = [
    {"category": "Brot & Brötchen", "name": "Brot, jede Sorte, 1 Scheibe", "points": "2"},
    {"category": "Brot & Brötchen", "name": "Brot, jede Sorte, 1 Scheibe", "points": "2"},
    {"category": "Brot & Brötchen", "name": "Baguettebrötchen, 1 Stück", "points": "4"},
    {"category": "Brot & Brötchen", "name": "Brötchen, jede Sorte", "points": "2"},
    {"category": "Brot & Brötchen", "name": "Croissant, 1 Stück", "points": "8.5"},
    {"category": "Brot & Brötchen", "name": "Fladenbrot, 1 Ecke, 50g", "points": "2"},
    {"category": "Brot & Brötchen", "name": "Knäckebrot, 1 Scheibe", "points": "0.5"},
    {"category": "Brot & Brötchen", "name": "Schwarzbrot", "points": "1.5"},
    {"category": "Brot & Brötchen", "name": "Toastbrot, 1 Scheibe, 20g", "points": "1"},
    {"category": "Brot & Brötchen", "name": "Zopf, 1 Scheibe, 50g", "points": "3.5"},
    {"category": "Brot & Brötchen", "name": "Zwieback, 1 Scheibe", "points": "0.5"},

    {"category": "Brotaufstriche", "name": "Erdnusscreme, 1 TL, 5g", "points": "1"},
    {"category": "Brotaufstriche", "name": "Marmelade/Konfitüre 1 TL, 5g", "points": "0"},
    {"category": "Brotaufstriche", "name": "Marmelade/Konfitüre 2 TL, 10g", "points": "0.5"},
    {"category": "Brotaufstriche", "name": "Honig, 1 TL, 5g", "points": "0"},
    {"category": "Brotaufstriche", "name": "Honig, 2 TL, 10g", "points": "0.5"},
    {"category": "Brotaufstriche", "name": "Nuss-Nougatcreme 1 TL, 5g", "points": "0.5"},
    {"category": "Brotaufstriche", "name": "Pflaumenmus, 3 TL", "points": "0.5"},
    {"category": "Brotaufstriche", "name": "Zuckerrübensirup 2 TL, 10g", "points": "0.5"},

    {"category": "Dessert & Süßspeisen", "name": "Apfelkompott/-mus mit Zucker, 2 TL", "points": "0.5"},
    {"category": "Dessert & Süßspeisen", "name": "Crepe, 1 Stück, 70g", "points": "4"},
    {"category": "Dessert & Süßspeisen", "name": "Dampfnudel, 1 kleine, 50g", "points": "3.5"},
    {"category": "Dessert & Süßspeisen", "name": "Fruchtcocktail, 1 EL, 20g, Konserve", "points": "0.5"},
    {"category": "Dessert & Süßspeisen", "name": "Fruchtcreme, 1 kl.Dessertschale, 150g", "points": "7"},
    {"category": "Dessert & Süßspeisen", "name": "Fruchtsalat, mit Zucker, 2 EL, 40g", "points": "0.5"},
    {"category": "Dessert & Süßspeisen", "name": "Götterspeise mit Zucker, 100g", "points": "5"},
    {"category": "Dessert & Süßspeisen", "name": "Grießbrei, 150g", "points": "4"},
    {"category": "Dessert & Süßspeisen", "name": "Milchreis, 125g", "points": "2"},
    {"category": "Dessert & Süßspeisen", "name": "Mokka-/Schokoladensauce, 1 EL, 20ml", "points": "0.5"},
    {"category": "Dessert & Süßspeisen", "name": "Mousse au Chocolat, 125g", "points": "10.5"},
    {"category": "Dessert & Süßspeisen", "name": "Tiramisu, 150g", "points": "8"},
    {"category": "Dessert & Süßspeisen", "name": "Vanille-/Schockladenpudding, 125g", "points": "3"},
    {"category": "Dessert & Süßspeisen", "name": "Vanillesauce, 1 EL, 20 ml", "points": "0.5"},
    {"category": "Dessert & Süßspeisen", "name": "Weincreme, 125g", "points": "7"},

    {"category": "Eis", "name": "Eisbecher mit Sahne & Früchte, 1 kl. Becher, 170g", "points": "8.5"},
    {"category": "Eis", "name": "Eiscreme, 1 Kugel, 50g", "points": "2.5"},
    {"category": "Eis", "name": "Eiskaffee, 1 Glas, 200ml", "points": "5.5"},
    {"category": "Eis", "name": "Fruchteis-/Milcheis, 1 Kugel, 50g", "points": "1.5"},
    {"category": "Eis", "name": "Softeis mit Waffel, 1 Stück, 100g", "points": "3"},
    {"category": "Eis", "name": "Sorbet, 1 Glas, 200ml", "points": "4"},
    {"category": "Eis", "name": "Wassereis am Stiel, 1 Stück, 110ml", "points": "1"},
    {"category": "Eis", "name": "Eiscreme am Stiel mit Schokoladenüberzug,1 Stück", "points": "8"},

    {"category": "Fette & Öle", "name": "Butter, 1 TL, 5g", "points": "1"},
    {"category": "Fette & Öle", "name": "Butter, halbfett, 1TL, 5g", "points": "0.5"},
    {"category": "Fette & Öle", "name": "Mayonnaise, 20% Fett, 2 TL", "points": "0.5"},
    {"category": "Fette & Öle", "name": "Mayonnaise, 50% Fett, 1 TL", "points": "0.5"},
    {"category": "Fette & Öle", "name": "Mayonnaise, 80% Fett, 1 TL", "points": "1"},
    {"category": "Fette & Öle", "name": "Pflanzencreme, 1 Tl, 5g", "points": "1"},
    {"category": "Fette & Öle", "name": "Pflanzenmargarine, fettreduziuert, bis 60% Fett, 2 TL", "points": "1.5"},
    {"category": "Fette & Öle", "name": "Pflanzenmargarine, halbfett, 1 TL", "points": "0.5"},
    {"category": "Fette & Öle", "name": "Pflanzenöl, 1 TL, 5g", "points": "1"},
    {"category": "Fette & Öle", "name": "Remoulade, bis 65% Fett, 1 TL", "points": "1"},
    {"category": "Fette & Öle", "name": "Schweineschmalz, 1 TL, 5g", "points": "1.5"},

    {"category": "Fisch", "name": "Aal, frisch, 1 Portion, 100g roh", "points": "7.5"},
    {"category": "Fisch", "name": "Aal, geräuchert, 1 Scheibe, 40g", "points": "3.5"},
    {"category": "Fisch", "name": "Austern, 3 Stück, 50g", "points": "0.5"},
    {"category": "Fisch", "name": "Bismarkhering, 1 Stück, 110g", "points": "6"},
    {"category": "Fisch", "name": "Brathering, 1 kleiner, 100g", "points": "5"},
    {"category": "Fisch", "name": "Bückling, geräuchert, 1/2 kl.,110g", "points": "6"},
    {"category": "Fisch", "name": "Egli, 10 Filets, 150g roh", "points": "2"},
    {"category": "Fisch", "name": "Fisch, fettarm,zb.Schellfisch, Seelachs, 1 kl. Filet, 150g roh", "points": "2"},
    {"category": "Fisch", "name": "Fischfilet, paniert, verzehrfertig, 1 Stück, 150g", "points": "7"},
    {"category": "Fisch", "name": "Fischstäbchen, 1 Stück, 30g", "points": "1"},
    {"category": "Fisch", "name": "Forelle, geräuchert, 1 kl. Filet, 60g", "points": "1.5"},
    {"category": "Fisch", "name": "Forelle, frisch, 1 kl., 300g roh", "points": "6"},
    {"category": "Fisch", "name": "Forelle, TK, 1 Stück, 200g roh", "points": "4"},
    {"category": "Fisch", "name": "Garnelen, ohne Schale, 5 mittelgr. Stücke, 30g", "points": "0.5"},
    {"category": "Fisch", "name": "Heilbutt, schwarz, geräuchert, 1 kl. Filet, 100g", "points": "5.5"},
    {"category": "Fisch", "name": "Heilbutt, schwarz, frisch, 1 kl. Filet, 125g roh", "points": "4.5"},
    {"category": "Fisch", "name": "Heilbutt, weiß, 1 kl. Filet, 125g roh", "points": "2"},
    {"category": "Fisch", "name": "Hering in Gelee, 1 Stück, 150g roh", "points": "6"},
    {"category": "Fisch", "name": "Hering, frisch, 1/2 Fisch, 90g roh", "points": "5"},
    {"category": "Fisch", "name": "Heringsfilet in Sahnesauce, 1 Filet, 60g", "points": "4"},
    {"category": "Fisch", "name": "Heringsfilet in Tomatensauce, 1/2 Dose, 95g", "points": "4.5"},
    {"category": "Fisch", "name": "Hummer, 1 kl. Portion, 125g", "points": "2"},
    {"category": "Fisch", "name": "Kabeljau/Dorsch, frisch, 1 kl. Filet, 150g roh", "points": "2"},
    {"category": "Fisch", "name": "Karpfen, frisch, 1 kl. Portion, 100g roh", "points": "2.5"},
    {"category": "Fisch", "name": "Katfisch/Steinbeißer, frisch, 125g roh", "points": "2"},
    {"category": "Fisch", "name": "Kaviar, echt, 2 TL, 10g", "points": "0.5"},
    {"category": "Fisch", "name": "Kaviar, Ersatz, 4 TL, 20g", "points": "0.5"},
    {"category": "Fisch", "name": "Krabben, 1 EL, 25g", "points": "0.5"},
    {"category": "Fisch", "name": "Lachs, geräuchert, 1 Scheibe, 60g", "points": "2"},
    {"category": "Fisch", "name": "Lachs, 1 kl. Steak, 125g roh", "points": "3.5"},
    {"category": "Fisch", "name": "Makrele in Öl, abgetropft, 1 EL, 30g", "points": "2"},
    {"category": "Fisch", "name": "Makrele, geräuchert, 1 kl. filet, 75g", "points": "3.5"},
    {"category": "Fisch", "name": "Makrele, frisch, 1/4 Stück, 90g roh", "points": "4"},
    {"category": "Fisch", "name": "Matjeshering, 1 Stück, 80g", "points": "5"},
    {"category": "Fisch", "name": "Muscheln, 1 Beutel, 500g", "points": "5"},
    {"category": "Fisch", "name": "Ölsardinen, abgetropft, 1 EL, 30g", "points": "1.5"},
    {"category": "Fisch", "name": "Rollmops, 1 Stück, 80g", "points": "2.5"},
    {"category": "Fisch", "name": "Rotbarsch, frisch, 1 kl. Filet, 150g roh", "points": "3"},
    {"category": "Fisch", "name": "Rotbarsch, geräuchert, 1 kl. Filet, 100g", "points": "3"},
    {"category": "Fisch", "name": "Sardellen in Salzlake, 5 Stück, 25g", "points": "0.5"},
    {"category": "Fisch", "name": "Sardine, 1 Stück, 60 g roh", "points": "2"},
    {"category": "Fisch", "name": "Schellfisch, geräuchert, 1 kl. Filet, 75g roh", "points": "1"},
    {"category": "Fisch", "name": "Schellfisch, frisch, 1 kl. Filet, 150g roh", "points": "2"},
    {"category": "Fisch", "name": "Schillerlocke 1/2 kleine, 60g", "points": "4.5"},
    {"category": "Fisch", "name": "Scholle, 1 Filet, 70g roh", "points": "1"},
    {"category": "Fisch", "name": "Seehecht/Hechtdorsch, 125g roh, 1 kl. Filet", "points": "2"},
    {"category": "Fisch", "name": "Seelachs in Öl, abgetropft, 1 Scheibe, 25g", "points": "3"},
    {"category": "Fisch", "name": "Seezunge, 1 Filet, 70g roh", "points": "1"},
    {"category": "Fisch", "name": "Sprotte, geräuchert, 1 Stück, 15g", "points": "1"},
    {"category": "Fisch", "name": "Thunfisch, frisch, 1 kl. Filet, 100g roh", "points": "5.5"},
    {"category": "Fisch", "name": "Thunfisch im eigenen Saft, Konserve, 1 EL, 30g", "points": "1"},
    {"category": "Fisch", "name": "Tintenfisch, 1 Mantelstück, 125g roh", "points": "0.5"},

    {"category": "Fleisch & Wurst", "name": "Bauchspeck, 1 kl. Stück, 10g", "points": "1"},
    {"category": "Fleisch & Wurst", "name": "Bierschinken, 1 Scheibe, 20g", "points": "1"},
    {"category": "Fleisch & Wurst", "name": "Bierwurst, 1 Scheibe, 20g", "points": "1.5"},
    {"category": "Fleisch & Wurst", "name": "Blutwurst, 1 Scheibe, 20g", "points": "1.5"},
    {"category": "Fleisch & Wurst", "name": "Cervelatwurst, 1 Scheibe, 20g", "points": "2"},
    {"category": "Fleisch & Wurst", "name": "Corned Beef, 1 Scheibe, 25g", "points": "0.5"},
    {"category": "Fleisch & Wurst", "name": "Fleischkäse/Leberkäse, 1 dünne Scheibe, 100g", "points": "8"},
    {"category": "Fleisch & Wurst", "name": "Fleischwurst, 1 Scheibe, 20g", "points": "1.5"},
    {"category": "Fleisch & Wurst", "name": "Frankfurter Rindswurst, 1 Stück, 100g", "points": "6"},
    {"category": "Fleisch & Wurst", "name": "Frikadelle, 1 kl. 100g", "points": "6"},
    {"category": "Fleisch & Wurst", "name": "Früchstücksspeck,1 Scheibe, 25g", "points": "4.5"},
    {"category": "Fleisch & Wurst", "name": "Hackfleisch, gemischt, 1EL, 30g roh", "points": "2"},
    {"category": "Fleisch & Wurst", "name": "Jagdwurst, 1 Scheibe, 20g", "points": "1"},
    {"category": "Fleisch & Wurst", "name": "Kalbfleisch, mager, 1 Scheibe, 125g roh", "points": "2"},
    {"category": "Fleisch & Wurst", "name": "Kalbsbratwurst, 1 Stück, 150g", "points": "11"},
    {"category": "Fleisch & Wurst", "name": "Kalbsleberwurst, 1 EL, 15g", "points": "1.5"},
    {"category": "Fleisch & Wurst", "name": "Kammscheibe vom Schwein, 1 Stück, 150g", "points": "7"},
    {"category": "Fleisch & Wurst", "name": "Kassler, 1 kl. Stück, 125g", "points": "4"},
    {"category": "Fleisch & Wurst", "name": "Kassleraufschnitt, 1 Scheibe, 15g", "points": "0.5"},
    {"category": "Fleisch & Wurst", "name": "Knackwurst, 1 Stück, 100g", "points": "8"},
    {"category": "Fleisch & Wurst", "name": "Lachsschinken, 2 Scheiben, 20g", "points": "0.5"},
    {"category": "Fleisch & Wurst", "name": "Lammkotelett, 1 kl., 80g roh", "points": "4"},
    {"category": "Fleisch & Wurst", "name": "Landjäger, 1 Stück, 90g", "points": "11.5"},
    {"category": "Fleisch & Wurst", "name": "Leber, 100g roh", "points": "2.5"},
    {"category": "Fleisch & Wurst", "name": "Leberknödel, 1 Stück, 100g", "points": "4.5"},
    {"category": "Fleisch & Wurst", "name": "Leberwurst, 1 EL, 15g", "points": "1.5"},
    {"category": "Fleisch & Wurst", "name": "Lyoner, 1 Stück, 125g", "points": "10"},
    {"category": "Fleisch & Wurst", "name": "Lyoner Wurst, 1 Scheibe, 20g", "points": "1.5"},
    {"category": "Fleisch & Wurst", "name": "Mettenden, 1 Stück, 75g", "points": "8"},
    {"category": "Fleisch & Wurst", "name": "Mettwurst, 1 EL, 15g", "points": "1.5"},
    {"category": "Fleisch & Wurst", "name": "Mortadella, 1 Scheibe, 20g", "points": "1.5"},
    {"category": "Fleisch & Wurst", "name": "Pferdefleisch, mager, 125 g roh", "points": "2.5"},
    {"category": "Fleisch & Wurst", "name": "Presskopf, 1 Scheibe, 30g", "points": "2"},
    {"category": "Fleisch & Wurst", "name": "Rinderhackfleisch, 1 EL, 30g roh", "points": "1.5"},
    {"category": "Fleisch & Wurst", "name": "Rinderroulade, 1 kl., 160g roh", "points": "4"},
    {"category": "Fleisch & Wurst", "name": "Rindersteak, 140g roh", "points": "4.5"},
    {"category": "Fleisch & Wurst", "name": "Rindfleisch, geräuchert, 50g", "points": "1"},
    {"category": "Fleisch & Wurst", "name": "Roastbeef, 1 Scheibe, 20g", "points": "0.5"},
    {"category": "Fleisch & Wurst", "name": "Rostbratwurst, 1 Stück, 100g", "points": "10"},
    {"category": "Fleisch & Wurst", "name": "Salami, 1 dünne Scheibe, 20g", "points": "2"},
    {"category": "Fleisch & Wurst", "name": "Schinken, gekocht, ohne Fett, 20g", "points": "0.5"},
    {"category": "Fleisch & Wurst", "name": "Schinkenwurst, 1 Scheibe, 20g", "points": "1.5"},
    {"category": "Fleisch & Wurst", "name": "Schweinesülze, 25g", "points": "1"},
    {"category": "Fleisch & Wurst", "name": "Schweinebratenaufschnitt, 15 g", "points": "0.5"},
    {"category": "Fleisch & Wurst", "name": "Schweinefleisch, mager, 150g roh/120 gegart", "points": "3"},
    {"category": "Fleisch & Wurst", "name": "Schweinehackfleisch, 1 EL, 30g roh", "points": "2"},
    {"category": "Fleisch & Wurst", "name": "Scheinekotelett, 1 Stück, 150g roh", "points": "4"},
    {"category": "Fleisch & Wurst", "name": "Scheinekotelett paniert, 1 Stück, 150g roh", "points": "7.5"},
    {"category": "Fleisch & Wurst", "name": "Schweineschnitzel, 150g roh", "points": "3"},
    {"category": "Fleisch & Wurst", "name": "Schweinsbratwurst, 1 Stück, 150g roh", "points": "12.5"},
    {"category": "Fleisch & Wurst", "name": "Teewurst, 1 EL, 15g", "points": "2"},
    {"category": "Fleisch & Wurst", "name": "Weißwurst, 1 Stück, 60g", "points": "4.5"},
    {"category": "Fleisch & Wurst", "name": "Wiener Würstchen, 1 Stück, 70g", "points": "6"},
    {"category": "Fleisch & Wurst", "name": "Wild, mager, 125g roh", "points": "3"},
    {"category": "Fleisch & Wurst", "name": "Zungenwurst, 1 Scheibe, 30g", "points": "2"},

    {"category": "Geflügel & Geflügelprodukte", "name": "Brathähnchen, mit Haut, 1/2, 370g", "points": "12.5"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Brathähnchen, ohne Haut, 1/2, 280g", "points": "5"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Ente, mit Haut, 150g roh", "points": "8.5"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Entenbrust, ohne Haut, 150g", "points": "5.5"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Gans, mit Haut, 150g", "points": "10.5"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Gans, ohne Haut, 150g", "points": "5"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Gänsekeule, 300g roh", "points": "11"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Geflügelbrustaufschnitt, geräuchert, 1 Scheibe, 20g", "points": "0.5"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Geflügelfrikadelle, 100g", "points": "6"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Geflügelleber, 100g roh", "points": "2.5"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Geflügelleberwurst, 1 EL, 15g", "points": "1"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Geflügelmortadella, 1 Scheibe, 20g", "points": "1"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Geflügelsalami, 1 Scheibe, 20g", "points": "1.5"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Geflügelschnitzel/-filet, 1 kl. Stück, 120g roh", "points": "2"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Geflügelwurstaufschnitt, 1 Scheibe, 20g", "points": "1"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Hähnchenkeule mit Haut, 1 Schenkel", "points": "5.5"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Hähnchenkeule ohne Haut, 1 Schenkel", "points": "2.5"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Putenschnitzel, paniert, 150g", "points": "4.5"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Straussenfleisch, 120g roh", "points": "2"},
    {"category": "Geflügel & Geflügelprodukte", "name": "Suppenhuhn, 1 kl. Portion, 150g", "points": "6.5"},

    {"category": "Gemüse & Hülsenfrüchte", "name": "Artischocken, Auberginen, Bambusssprossen, Blattsalat", "points": "0"},
    {"category": "Gemüse & Hülsenfrüchte", "name": "Sellerie, Blumenkohl, Bohnen, Broccoli, Chicoree", "points": "0"},
    {"category": "Gemüse & Hülsenfrüchte", "name": "Chinakohl, Fenchel, Gemüsesaft, Grünkohl", "points": "0"},
    {"category": "Gemüse & Hülsenfrüchte", "name": "Gurken eingelegt, Knoblauch, Kohlrabi, Kräuter", "points": "0"},
    {"category": "Gemüse & Hülsenfrüchte", "name": "Kürbis, Möhren, Paprikaschoten, Pilze", "points": "0"},
    {"category": "Gemüse & Hülsenfrüchte", "name": "Porree, Radieschen, Rhabarber, Rosenkohl", "points": "0"},
    {"category": "Gemüse & Hülsenfrüchte", "name": "Rotkohl, Rote Bete, Rüben, Sauerkraut", "points": "0"},
    {"category": "Gemüse & Hülsenfrüchte", "name": "Schwarzwurzeln, Spargel, Spinat, Tomaten", "points": "0"},
    {"category": "Gemüse & Hülsenfrüchte", "name": "Weißkohl, Wirsing, Zucchini, Zwiebel", "points": "0"},
    {"category": "Gemüse & Hülsenfrüchte", "name": "Zuckererbsen, 1 Hand voll, 50g", "points": "0.5"},
    {"category": "Gemüse & Hülsenfrüchte", "name": "Oliven, 5 Stück", "points": "0.5"},
    {"category": "Gemüse & Hülsenfrüchte", "name": "Mais, Konserve, 2 EL, 50g", "points": "0.5"},
    {"category": "Gemüse & Hülsenfrüchte", "name": "Hülsenfrüchte, zb. Linsen, Erbsen, Kidneybohnen, 1 EL", "points": "0.5"},

    {"category": "Getränke, alkoholfrei", "name": "Alkoholfreies Bier, 200ml", "points": "1"},
    {"category": "Getränke, alkoholfrei", "name": "Apfelsaftschorle, 200ml", "points": "0.5"},
    {"category": "Getränke, alkoholfrei", "name": "Bitter Lemon, 200ml", "points": "1"},
    {"category": "Getränke, alkoholfrei", "name": "Cappuccino mit Milch, 1 Tasse, 150ml", "points": "1"},
    {"category": "Getränke, alkoholfrei", "name": "Cola, 200ml", "points": "2"},
    {"category": "Getränke, alkoholfrei", "name": "Cola light", "points": "0"},
    {"category": "Getränke, alkoholfrei", "name": "Diät-Multivitaminsaft, 200ml", "points": "0.5"},
    {"category": "Getränke, alkoholfrei", "name": "Eistee, 200ml", "points": "1"},
    {"category": "Getränke, alkoholfrei", "name": "Energie-Drinks, 200ml", "points": "1.5"},
    {"category": "Getränke, alkoholfrei", "name": "Früchtetee", "points": "0"},
    {"category": "Getränke, alkoholfrei", "name": "Fruchtsaft, 200ml", "points": "1"},
    {"category": "Getränke, alkoholfrei", "name": "Ginger Ale, 200ml", "points": "1"},
    {"category": "Getränke, alkoholfrei", "name": "Kaffee", "points": "0"},
    {"category": "Getränke, alkoholfrei", "name": "Kräutertee", "points": "0"},
    {"category": "Getränke, alkoholfrei", "name": "Light Getränke, Tomatensaft, Wasser, Tafelwasser, Mineralwasser", "points": "0"},
    {"category": "Getränke, alkoholfrei", "name": "Kakao, Schokolade, 1 gr. Tasse, 200ml", "points": "5"},
    {"category": "Getränke, alkoholfrei", "name": "Tea & Fruit, mit Zucker, 200ml", "points": "1"},

    {"category": "Getränke, alkoholisch", "name": "Apfelwein, 200ml", "points": "1.5"},
    {"category": "Getränke, alkoholisch", "name": "Berliner Weiße mit Schucc, 250ml", "points": "2"},
    {"category": "Getränke, alkoholisch", "name": "Radler, Alster, 200ml", "points": "1"},
    {"category": "Getränke, alkoholisch", "name": "Bier, jede Sorte (außer Starkbier), 330ml", "points": "2.5"},
    {"category": "Getränke, alkoholisch", "name": "Bockbier, 200ml", "points": "2"},
    {"category": "Getränke, alkoholisch", "name": "Bowle, Punsch, 200ml", "points": "3.5"},
    {"category": "Getränke, alkoholisch", "name": "Campari, 100ml", "points": "1"},
    {"category": "Getränke, alkoholisch", "name": "Cognac, 20ml", "points": "1"},
    {"category": "Getränke, alkoholisch", "name": "Dessertwein, 50ml", "points": "1.5"},
    {"category": "Getränke, alkoholisch", "name": "Glühwein, 200ml", "points": "3.5"},
    {"category": "Getränke, alkoholisch", "name": "Likör, jede Sorte, 20ml", "points": "1"},
    {"category": "Getränke, alkoholisch", "name": "Malzbier, 200ml", "points": "2"},
    {"category": "Getränke, alkoholisch", "name": "Rum, 20ml", "points": "1"},
    {"category": "Getränke, alkoholisch", "name": "schnaps, jede Sorte, 20ml", "points": "1"},
    {"category": "Getränke, alkoholisch", "name": "Sekt, Champagner, jede Sorte, 100ml", "points": "1.5"},
    {"category": "Getränke, alkoholisch", "name": "Sherry, 50ml", "points": "1"},
    {"category": "Getränke, alkoholisch", "name": "Wein, schwere & süße, 100ml", "points": "1.5"},
    {"category": "Getränke, alkoholisch", "name": "Wein, trocken, 100ml", "points": "1"},
    {"category": "Getränke, alkoholisch", "name": "Weinbrand, 20ml", "points": "1"},
    {"category": "Getränke, alkoholisch", "name": "Weinschorle, 200ml", "points": "1"},
    {"category": "Getränke, alkoholisch", "name": "Weizenbier, 500ml", "points": "4"},
    {"category": "Getränke, alkoholisch", "name": "Wermut, süß, 50ml", "points": "1.5"},
    {"category": "Getränke, alkoholisch", "name": "Wermut, trocken, 50ml", "points": "1"},
    {"category": "Getränke, alkoholisch", "name": "Whisky, 20ml", "points": "1"},

    {"category": "Getreide & Getreideprodukte", "name": "Cornflakes, 1 Tasse, 20g", "points": "1"},
    {"category": "Getreide & Getreideprodukte", "name": "Popcorn, Puffreis, 40g", "points": "2"},
    {"category": "Getreide & Getreideprodukte", "name": "Getreidekörner, 1 Tasse, 100g", "points": "1"},
    {"category": "Getreide & Getreideprodukte", "name": "Grieß, trocken, 1 EL, 20g", "points": "0.5"},
    {"category": "Getreide & Getreideprodukte", "name": "Hafer/-Gertreideflocken, 1 EL, 10g", "points": "0.5"},
    {"category": "Getreide & Getreideprodukte", "name": "Hirse trocken, 1 EL, 20g", "points": "1"},
    {"category": "Getreide & Getreideprodukte", "name": "Knuspermüsli, gesüßt, geröstet, 1 EL, 10g", "points": "1"},
    {"category": "Getreide & Getreideprodukte", "name": "Mais, trocken,zb. für Popkorn, 1 EL, 10g", "points": "0.5"},
    {"category": "Getreide & Getreideprodukte", "name": "Mehl, jede Sorte, 1 TL, 10g", "points": "0.5"},
    {"category": "Getreide & Getreideprodukte", "name": "Milchreis, trocken, 1 EL, 20g", "points": "1"},
    {"category": "Getreide & Getreideprodukte", "name": "Müsliriegel, 1 kl., 25g", "points": "2"},
    {"category": "Getreide & Getreideprodukte", "name": "Paniermehl, 1 EL, 10g", "points": "0.5"},
    {"category": "Getreide & Getreideprodukte", "name": "Reis, jede Sorte, 1 EL, 20g", "points": "1"},
    {"category": "Getreide & Getreideprodukte", "name": "Reiswaffel, 1 St., 8g", "points": "0.5"},
    {"category": "Getreide & Getreideprodukte", "name": "Schokomüsli, 1 EL, 10g", "points": "1"},
    {"category": "Getreide & Getreideprodukte", "name": "Stärkemehl, 1 EL, 10g", "points": "0.5"},

    {"category": "Kartoffeln & Klöße", "name": "Bratkartoffeln, 1 Port., 200g", "points": "7"},
    {"category": "Kartoffeln & Klöße", "name": "Kartoffelklöße, Fertigprodukt, 1 St., 90g", "points": "1.5"},
    {"category": "Kartoffeln & Klöße", "name": "Kartoffelklöße, Fertigprodukt, Pulver, 1 EL, 10g", "points": "0.5"},
    {"category": "Kartoffeln & Klöße", "name": "Kartoffelklöße, selbsthergestellt, 1 St., 100g", "points": "2"},
    {"category": "Kartoffeln & Klöße", "name": "Kartoffelkroketten, verzehrfertig, 1 St., 30g", "points": "1"},
    {"category": "Kartoffeln & Klöße", "name": "Kartoffeln, (Menge pro Mahlzeit, bis Sie satt sind)", "points": "2"},
    {"category": "Kartoffeln & Klöße", "name": "Kartoffelpüree, Fertigprodukt, Pulver, 1 EL, 10g", "points": "1"},
    {"category": "Kartoffeln & Klöße", "name": "Ofen-Pommes Frites, 150g", "points": "6.5"},
    {"category": "Kartoffeln & Klöße", "name": "Reibekuchen, verzehrfertig, 1 St., 60g", "points": "4.5"},
    {"category": "Kartoffeln & Klöße", "name": "Röstis, 1 ST., 60g", "points": "2"},
    {"category": "Kartoffeln & Klöße", "name": "Semmelknödel, 1 St., 100g", "points": "3.5"},
    {"category": "Kartoffeln & Klöße", "name": "Süßkartoffel, 1 St., 50g", "points": "1"},

    {"category": "Käse", "name": "Camembert, Brie & andere Weichkäse, 45% Fett, 1 kl.Ecke, 30g", "points": "1.5"},
    {"category": "Käse", "name": "Camembert, wie oben, nur 60% Fett", "points": "3"},
    {"category": "Käse", "name": "Edelpilzkäse, Vollfettstufe, 45% Fett, 1 kl. Ecke, 30g", "points": "2"},
    {"category": "Käse", "name": "Edelpilzkäse, Doppelrahmstufe, 65% Fett, 1 kl. Ecke, 30g", "points": "4"},
    {"category": "Käse", "name": "Frischkäse, natur mit Kräutern, 30% Fett, 1 EL", "points": "0.5"},
    {"category": "Käse", "name": "Gorgonola, 1 kl. Ecke, 30g", "points": "3"},
    {"category": "Käse", "name": "Hartkäse, zb. Emmentaler, 45% Fett, 1 kl. Ecke, 30g", "points": "2.5"},
    {"category": "Käse", "name": "Käse, gerieben, zb.Parmesan, 30-32% Fett, 1 EL, 8g", "points": "0.5"},
    {"category": "Käse", "name": "Kochkäse, 10% Fett, 2 TL", "points": "0.5"},
    {"category": "Käse", "name": "Mozzarella, 1/2 Kugel, 50g", "points": "3"},
    {"category": "Käse", "name": "Raclettekäse, 60% Fett, 1 Scheibe, 30g", "points": "3"},
    {"category": "Käse", "name": "Roquefort, 1 kl. Ecke, 30g", "points": "3"},
    {"category": "Käse", "name": "Sauermilchkäse, zb.Harzer, 1 kl.Rolle", "points": "2"},
    {"category": "Käse", "name": "Schafkäse/Feta, 45% Fett, 1 EL, 15g", "points": "1"},
    {"category": "Käse", "name": "Schmelzkäse, 30% Fett, 2 EL, 25g", "points": "1.5"},
    {"category": "Käse", "name": "Schmelzkäse, 45% Fett, 2 EL, 25g", "points": "2"},
    {"category": "Käse", "name": "Schmelzkäsescheiben, 20-25% Fett, 1 Scheibe", "points": "1"},
    {"category": "Käse", "name": "Schnittkäse, 30% Fett, 1 Scheibe, 30g", "points": "2"},
    {"category": "Käse", "name": "Schnittkäse, 45-48% Fett, 1 Scheibe, 30g", "points": "2.5"},
    {"category": "Käse", "name": "Ziegenkäse, 45% Fett, 1 Scheibe, 30g", "points": "2"},

    {"category": "Knabbereien", "name": "Brotchips, jede Sorte, 1 St., 5g", "points": "0.5"},
    {"category": "Knabbereien", "name": "Chipsletten, 5 St., 8g", "points": "1"},
    {"category": "Knabbereien", "name": "Erdnüsse, geröstet, 1TL, 5g", "points": "1"},
    {"category": "Knabbereien", "name": "Erdnussflips, 1 Hand voll, 6g", "points": "1"},
    {"category": "Knabbereien", "name": "Gebäckknusperstangen mit Käse, 1 St., 7g", "points": "1"},
    {"category": "Knabbereien", "name": "Grissini, Brotsticks, 1 St., 5g", "points": "0.5"},
    {"category": "Knabbereien", "name": "Kartoffelchips, 1 Hand voll, 15g", "points": "2"},
    {"category": "Knabbereien", "name": "Knabbergebäck,zb.Party Mix, 1 Hand voll, 10g", "points": "0.5"},
    {"category": "Knabbereien", "name": "Kräcker, 5 St., 30g", "points": "2"},
    {"category": "Knabbereien", "name": "Mandeln gebrannt, 1 kl. Portion, 50g", "points": "6.5"},
    {"category": "Knabbereien", "name": "Popkorn, süß, fertig, 1 Hand voll, 5g", "points": "0.5"},
    {"category": "Knabbereien", "name": "Salzbrezeln, 5 St., 10g", "points": "0.5"},
    {"category": "Knabbereien", "name": "Salzstangen, 10 St., 10g", "points": "0.5"},
    {"category": "Knabbereien", "name": "Studentenfutter, 1 EL, 12g", "points": "1.5"},
    {"category": "Knabbereien", "name": "Vollkorn dinkel Sesambrezeln, 5 St., 12g", "points": "1"},
    {"category": "Knabbereien", "name": "Vollkorngebäckstangen, 3 St., 15g", "points": "1"},

    {"category": "Kuchen & Kekse", "name": "Amerikaner, 1 St., 100g", "points": "4.5"},
    {"category": "Kuchen & Kekse", "name": "Apfelkuchen, gedeckt, Mürbeteig, 1 St., 150g", "points": "7"},
    {"category": "Kuchen & Kekse", "name": "Apfelstrudel aus Blätterteig, 1 St., 150g", "points": "8.5"},
    {"category": "Kuchen & Kekse", "name": "Apfelstrudel aus Strudelteig, 1 St., 150g", "points": "5"},
    {"category": "Kuchen & Kekse", "name": "Baiser, 1 St., 25g", "points": "1.5"},
    {"category": "Kuchen & Kekse", "name": "Berliner Ballen/Pfannkuchen, 1 St., 60g", "points": "4"},
    {"category": "Kuchen & Kekse", "name": "Bienenstich, 1 St., 25g", "points": "1.5"},
    {"category": "Kuchen & Kekse", "name": "Biskuit-Obstboden ohne Belag, 1 St., 25g", "points": "1.5"},
    {"category": "Kuchen & Kekse", "name": "Biskuitplätzchen, 2 St., 10g", "points": "0.5"},
    {"category": "Kuchen & Kekse", "name": "Biskuitrolle, 1 St., 100g", "points": "5"},
    {"category": "Kuchen & Kekse", "name": "Blätterteig-Plunderteilchen, 1 St., 70g", "points": "5.5"},
    {"category": "Kuchen & Kekse", "name": "Buttergebäck, 1 St., 10g", "points": "1"},
    {"category": "Kuchen & Kekse", "name": "Butterkekse, 3 St., 15g", "points": "1"},
    {"category": "Kuchen & Kekse", "name": "Christstollen, 1 St., 100g", "points": "9"},
    {"category": "Kuchen & Kekse", "name": "Donut, 1 St., 50g", "points": "3"},
    {"category": "Kuchen & Kekse", "name": "Doppelkeks mit Schokoladenfüllung, 1 St., 25g", "points": "2.5"},
    {"category": "Kuchen & Kekse", "name": "Frankfurter Kranz, 1 St., 70g", "points": "6"},
    {"category": "Kuchen & Kekse", "name": "Früchtebrot, 1 St., 70g", "points": "5"},
    {"category": "Kuchen & Kekse", "name": "Hefeteilchen/-stückchen, 1 St., 65g", "points": "3.5"},
    {"category": "Kuchen & Kekse", "name": "Honigkuchen, 1 st., 70g", "points": "3.5"},
    {"category": "Kuchen & Kekse", "name": "Käsekuchen, 1 St., 100g", "points": "5.5"},
    {"category": "Kuchen & Kekse", "name": "Lebkuchen, 1 St., 40g", "points": "3.5"},
    {"category": "Kuchen & Kekse", "name": "Linzer Torte, 1 St., 70g", "points": "7.5"},
    {"category": "Kuchen & Kekse", "name": "Löffelbiskuits, 3 St., 15g", "points": "1"},
    {"category": "Kuchen & Kekse", "name": "Marmorkuchen, 1 St., 70g", "points": "7"},
    {"category": "Kuchen & Kekse", "name": "Mürbeteig, Tortelett, 1 St., 25g", "points": "5"},
    {"category": "Kuchen & Kekse", "name": "Mutzen, 1 kl. Tüte, 100g", "points": "6"},
    {"category": "Kuchen & Kekse", "name": "Mohnkuchen, 1 St., 100g", "points": "7"},
    {"category": "Kuchen & Kekse", "name": "Nussecke, 1 St., 110g", "points": "12.5"},
    {"category": "Kuchen & Kekse", "name": "Nusskuchen, 1 St., 50g", "points": "5.5"},
    {"category": "Kuchen & Kekse", "name": "Obstkuchen, Hefeteig, 1 st., 150g", "points": "4"},
    {"category": "Kuchen & Kekse", "name": "Obstkuchen, Mürbeteig, 1 St., 150g", "points": "7"},
    {"category": "Kuchen & Kekse", "name": "Obstkuchen, Quarkölteig, 1 St., 150g", "points": "9.5"},
    {"category": "Kuchen & Kekse", "name": "Obsttörtchen, Tortelett+Belag, 1 St., 100gl", "points": "4.5"},
    {"category": "Kuchen & Kekse", "name": "Pfeffernüsse, 1 St., 10g", "points": "0.5"},
    {"category": "Kuchen & Kekse", "name": "Plätzchen mit Cremefüllung, 2 kl., 12g", "points": "1.5"},
    {"category": "Kuchen & Kekse", "name": "Plätzchen mit Schokolade, 2 kl., 12g", "points": "1.5"},
    {"category": "Kuchen & Kekse", "name": "Plunderstückchen mit Mazipan, 1 St., 20g", "points": "8.5"},
    {"category": "Kuchen & Kekse", "name": "Printen, 1 St., 20g", "points": "2"},
    {"category": "Kuchen & Kekse", "name": "Russisch Brot, 3 St., 15g", "points": "1"},
    {"category": "Kuchen & Kekse", "name": "Schwarzwälder Kirschtorte, 1 St., 120g", "points": "7"},
    {"category": "Kuchen & Kekse", "name": "Schwarz-Weißgebäck, 1 St., 10g", "points": "1"},
    {"category": "Kuchen & Kekse", "name": "Schweinsohren, Blätterteig, 1 St., 70g", "points": "8"},
    {"category": "Kuchen & Kekse", "name": "Spekulatius, 1 St., 10g", "points": "1"},
    {"category": "Kuchen & Kekse", "name": "Springerle, 1 St., 10g", "points": "0.5"},
    {"category": "Kuchen & Kekse", "name": "Spitzgebäck, 1 St., 10g", "points": "1"},
    {"category": "Kuchen & Kekse", "name": "Stollen, Dresdner, 1 St., 100g", "points": "9"},
    {"category": "Kuchen & Kekse", "name": "Streuselkuchen, Hefeteig, 1 St., 70g", "points": "5.5"},
    {"category": "Kuchen & Kekse", "name": "Vollkornkeks, ohne Schokolade/Creme, 3 kl. St., 20g", "points": "2"},
    {"category": "Kuchen & Kekse", "name": "Waffel, frisch zubereitet, 1 St., 100g", "points": "6.5"},
    {"category": "Kuchen & Kekse", "name": "Zimtsterne, 1 St., 15g", "points": "1"},
    {"category": "Kuchen & Kekse", "name": "Zitronenkuchen, 1 St., 70g", "points": "6.5"},

    {"category": "Milch & Milchprodukte", "name": "Buttermilch, 1 Glas, 250ml", "points": "1.5"},
    {"category": "Milch & Milchprodukte", "name": "Buttermilch mit Früchten, 250ml", "points": "3"},
    {"category": "Milch & Milchprodukte", "name": "Creme Fraiche, 1 TL, 5g", "points": "0.5"},
    {"category": "Milch & Milchprodukte", "name": "Dickmilch, 250ml", "points": "3.5"},
    {"category": "Milch & Milchprodukte", "name": "Joghurt mit Frucht, bis 0,4% Fett, 1 Becher, 150g", "points": "1.5"},
    {"category": "Milch & Milchprodukte", "name": "Joghurt mit Frucht, bis 3,5% Fett, 150g", "points": "3"},
    {"category": "Milch & Milchprodukte", "name": "Joghurt natur, entrahmt, 0,1% Fett, 180g", "points": "1.5"},
    {"category": "Milch & Milchprodukte", "name": "Joghurt-Drink mit Frucht, 1 Flasche, 330ml", "points": "3"},
    {"category": "Milch & Milchprodukte", "name": "Kaffeesahne, 10% Fett, 3 TL, 15g", "points": "0.5"},
    {"category": "Milch & Milchprodukte", "name": "Kaffeeweißer, 1 TL, 5g", "points": "0.5"},
    {"category": "Milch & Milchprodukte", "name": "Kefir, bis 1,5% Fett, 250ml", "points": "2"},
    {"category": "Milch & Milchprodukte", "name": "Kefir, bis 3,5% Fett, 250ml", "points": "3.5"},
    {"category": "Milch & Milchprodukte", "name": "Kondensmilch, 4-7% Fett, 4 TL, 20ml", "points": "0.5"},
    {"category": "Milch & Milchprodukte", "name": "Kondensmilch bis 12% Fett, 2 TL, 10ml", "points": "0.5"},
    {"category": "Milch & Milchprodukte", "name": "Magermilchpulver, 3 TL, 15g", "points": "1"},
    {"category": "Milch & Milchprodukte", "name": "Milch, entrahmt, 0,3% Fett, 250ml", "points": "1.5"},
    {"category": "Milch & Milchprodukte", "name": "Milch, fettarm, 1,5% Fett, 250ml", "points": "2"},
    {"category": "Milch & Milchprodukte", "name": "Milch, vollfett, 3,5% Fett, 250ml", "points": "3.5"},
    {"category": "Milch & Milchprodukte", "name": "Molke, 1 Glas, 250ml", "points": "1"},
    {"category": "Milch & Milchprodukte", "name": "Molkenpulver, jede Sorte, 1 EL, 15g", "points": "1"},
    {"category": "Milch & Milchprodukte", "name": "Sahne/Rahm, flüssig, bis 30% Fett, 2 EL, 30ml", "points": "2.5"},
    {"category": "Milch & Milchprodukte", "name": "Sahnejoghurt, jede Sorte, 1 Becher, 150g", "points": "4"},
    {"category": "Milch & Milchprodukte", "name": "Sahnejoghurt, jede Sorte, 1 Becher, 250g", "points": "7"},
    {"category": "Milch & Milchprodukte", "name": "Sauerrahm/Schmand, 24% Fett, 1 EL, 15g", "points": "1"},
    {"category": "Milch & Milchprodukte", "name": "Speisequark, natur mit Kräutern, 0,1% Fett, 3 EL, 75g", "points": "1"},
    {"category": "Milch & Milchprodukte", "name": "Speisequark, Halbfettstufe, 20% Fett, 1 EL, 25g", "points": "1"},
    {"category": "Milch & Milchprodukte", "name": "Vollrahm, 35% Fett, 1 EL, 15g", "points": "1.5"},

    {"category": "Nudeln, Pizza & Co", "name": "Cannelloni, trocken, 1 St., 10g", "points": "0.5"},
    {"category": "Nudeln, Pizza & Co", "name": "Flammkuchen, Elsässer, 1 Portion", "points": "18"},
    {"category": "Nudeln, Pizza & Co", "name": "Glasnudeln, verzehrfertig, 1 Tasse, 120g", "points": "2"},
    {"category": "Nudeln, Pizza & Co", "name": "Gnocchi, Fertigprodukt, 1 Portion, 125g", "points": "4.5"},
    {"category": "Nudeln, Pizza & Co", "name": "Lasagneplatten, trocken, 1 St., 20g", "points": "1"},
    {"category": "Nudeln, Pizza & Co", "name": "Maultaschen, verzehrfertig, 1 St., 50g", "points": "2"},
    {"category": "Nudeln, Pizza & Co", "name": "Nudeln, jede Sorte, verzehrfertig, 1 Tasse, 120g", "points": "2"},
    {"category": "Nudeln, Pizza & Co", "name": "Pizza Margherita, TK, 1/2 Pizza ca. 150g", "points": "7"},
    {"category": "Nudeln, Pizza & Co", "name": "Pizza mit Gemüse, TK zb.Spinat, Champignons, 1/2 Pizza ca. 180g", "points": "8.5"},
    {"category": "Nudeln, Pizza & Co", "name": "Pizza Salami, TK, 1/2 Pizza, ca. 160g", "points": "10"},
    {"category": "Nudeln, Pizza & Co", "name": "Ravioli, verzehrfertig, 1 Tasse, 125g", "points": "2"},
    {"category": "Nudeln, Pizza & Co", "name": "Schupfnudeln, verzehrfertig, 1 EL, 30g", "points": "0.5"},
    {"category": "Nudeln, Pizza & Co", "name": "Spätzle, verzehrfertig, 1 EL, 30g", "points": "1"},
    {"category": "Nudeln, Pizza & Co", "name": "Tortellini, verzehrfertig, 1 Tasse, 120g", "points": "2"},

    {"category": "Obst", "name": "Ananas, Apfel, Aprikose, Beerern jede Sorte", "points": "0"},
    {"category": "Obst", "name": "Birne, Erdbeeren, Grapefruit, Guave", "points": "0"},
    {"category": "Obst", "name": "Banane, 1 kleine, 100g", "points": "1"},
    {"category": "Obst", "name": "Bananenchips, ungesüßt, mit Fett, 1 Portion, 40g", "points": "2"},
    {"category": "Obst", "name": "Dattel, frisch, 2 St., 12g", "points": "0.5"},
    {"category": "Obst", "name": "Feigen, frisch, 1 St., 50g", "points": "0.5"},
    {"category": "Obst", "name": "Karambole, Kiwi, Mandarine, Melone, Nektarine", "points": "0"},
    {"category": "Obst", "name": "Kirschen, 8 St., 50g", "points": "0.5"},
    {"category": "Obst", "name": "Litchi, 4 St., 50g", "points": "0.5"},
    {"category": "Obst", "name": "Obstkonserven mit Zucker, 1 Portion, 150g", "points": "2"},
    {"category": "Obst", "name": "Obstscheiben, ungesüßt, getrocknet, 1 Portion, 40g", "points": "1.5"},
    {"category": "Obst", "name": "Orange, Papaya, Pfirsich, Quitte, Tangerine", "points": "0"},
    {"category": "Obst", "name": "Mango, 1/2 kl. Frucht, 100g", "points": "1"},
    {"category": "Obst", "name": "Mirabellen, 3 St., 60g", "points": "0.5"},
    {"category": "Obst", "name": "Pflaumen, 1 St., 50g", "points": "0.5"},
    {"category": "Obst", "name": "Reineclauden, 3 St., 60g", "points": "0.5"},
    {"category": "Obst", "name": "Rosinen, 2 EL, 14g", "points": "0.5"},
    {"category": "Obst", "name": "Trockenobst, jede Sorte, 1 St., 20g", "points": "0.5"},
    {"category": "Obst", "name": "weintrauben, 1 Hand voll, 100g", "points": "1"},
    {"category": "Obst", "name": "Zwetschgen, 2 St., 50g", "points": "0.5"},

    {"category": "Salat", "name": "Fleischsalat mit Mayonnaise, 1 EL, 30g", "points": "2.5"},
    {"category": "Salat", "name": "Geflügelsalat mit Mayonnaise, 1 EL, 30g", "points": "2.5"},
    {"category": "Salat", "name": "Heringssalat, 1 EL, 30g", "points": "1.5"},
    {"category": "Salat", "name": "Kartoffelsalat mit Mayonnaise, 1 EL, 30g", "points": "1.5"},
    {"category": "Salat", "name": "Kartoffelsalat mit Öl, 1 EL, 30g", "points": "1"},
    {"category": "Salat", "name": "Krautsalat ohne Sahne, 3 EL, 60g", "points": "0.5"},
    {"category": "Salat", "name": "Nudelsalat, 1 EL, 30g", "points": "2"},
    {"category": "Salat", "name": "Reissalat mit Thunfisch, 1 EL, 30g", "points": "2"},
    {"category": "Salat", "name": "Tomaten/Gurkensalat mit Sahne, 1 EL, 30g", "points": "0.5"},
    {"category": "Salat", "name": "Waldorfsalat mit Mayonnaise, 1 EL, 30g", "points": "1"},
    {"category": "Salat", "name": "Wurstsalat, 1 EL, 30g", "points": "2.5"},

    {"category": "Saucen & Dressings & Fixprodukte", "name": "Bechamelsauce, 1 eL, 20ml", "points": "0.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Bratensauce, 1 EL, 20ml", "points": "0.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Chilisauce, 1 EL, 20ml", "points": "1"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Chutney, 1 eL, 20ml", "points": "0.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Cocktail-Dressing, 1 EL, 20ml", "points": "3.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Fix für Salatsauce, 1 Päckchen, 10g", "points": "0.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Fonduesaucen, 1 EL, 20ml", "points": "0.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Frankfurter Sauce, 1 EL, 20ml", "points": "1"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "French-Dressing, 1 EL, 15ml", "points": "1"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Grillsauce, 1 EL, 20ml", "points": "0.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Hackfleischsauce, 1 EL, 30ml", "points": "1"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Instantsaucen, trocken, 1 EL, 10g", "points": "1"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Italien-Dressing, 1 eL, 15ml", "points": "0.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Jägersauce, 1 EL, 20ml", "points": "0.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Joghurt-Dressing, 1 EL, 15ml", "points": "0.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Käsesauce, 1 EL, 20ml", "points": "0.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Ketchup, 1 EL, 20ml", "points": "0.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Letscho, 2 EL, 40ml", "points": "0.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Sahnesauce, 1 EL, 20ml", "points": "1.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Salatdressing mit Öl, 1 EL, 15ml", "points": "2"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Salatdressing ohne Öl", "points": "0"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Salsa Sauce, 3 EL, 60ml", "points": "0.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Sauce Hollandaise, 1 EL, 20ml", "points": "2.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Saucenbinder, Instantpulver, 1 EL, 15g", "points": "0.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Senfsauce, 1 EL, 20ml", "points": "0.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Tomatensauce, 2 EL, 40ml", "points": "0.5"},
    {"category": "Saucen & Dressings & Fixprodukte", "name": "Vinaigrette(Essig und Öl), 1 EL, 15ml", "points": "1"},

    {"category": "Süßigkeiten", "name": "Bonbon, jede Sorte, 1 St., 5g", "points": "0.5"},
    {"category": "Süßigkeiten", "name": "Bonbon ohne Zucker, jede Sorte, 3 St., 15g", "points": "0.5"},
    {"category": "Süßigkeiten", "name": "Dominostein, 1 St., 12g", "points": "1"},
    {"category": "Süßigkeiten", "name": "frucht-oder Weingummi, 1 St., 10g", "points": "0.5"},
    {"category": "Süßigkeiten", "name": "Fruchtriegel/schnitte, 1 St., 50g", "points": "5"},
    {"category": "Süßigkeiten", "name": "Gefüllte Süßwaren, Pralinen, 1 St., 12g", "points": "1.5"},
    {"category": "Süßigkeiten", "name": "Geleefrucht, 1 St., 10g", "points": "0.5"},
    {"category": "Süßigkeiten", "name": "Getreideriegel mit schokoladenüberzug, 1 Riegel, 30g", "points": "3.5"},
    {"category": "Süßigkeiten", "name": "Gummibärchen, 5 St., 10g", "points": "0.5"},
    {"category": "Süßigkeiten", "name": "Karamellbonbon, 1 St., 5g", "points": "0.5"},
    {"category": "Süßigkeiten", "name": "Kaugummi, ohne Zucker", "points": "0"},
    {"category": "Süßigkeiten", "name": "Kaugummi mit Zucker, 3 St., 9g", "points": "0.5"},
    {"category": "Süßigkeiten", "name": "Knäckebrot mit Schokolade, 20g", "points": "2"},
    {"category": "Süßigkeiten", "name": "Lakritz, 1 kl. Portion, 25g", "points": "1.5"},
    {"category": "Süßigkeiten", "name": "Marzipan, 1 kl. St., 25g", "points": "2.5"},
    {"category": "Süßigkeiten", "name": "Marzipankartoffel, 1 St., 5g", "points": "0.5"},
    {"category": "Süßigkeiten", "name": "Micro Bon Bons, frucht, jede Sorte, 1 Packung, 12 St., 27g", "points": "0.5"},
    {"category": "Süßigkeiten", "name": "Nougat, 1 St., 25g", "points": "2.5"},
    {"category": "Süßigkeiten", "name": "Osterei, Krokant, 1 St., 25g", "points": "1.5"},
    {"category": "Süßigkeiten", "name": "Osterei mit Alkohol, 1 St., 15g", "points": "2"},
    {"category": "Süßigkeiten", "name": "Osterei mit Cremefüllung, 1 St., 20g", "points": "1.5"},
    {"category": "Süßigkeiten", "name": "Ostserei mit Nougatfüllung, 1 St., 20g", "points": "2.5"},
    {"category": "Süßigkeiten", "name": "Praline, 1 St., 12g", "points": "1"},
    {"category": "Süßigkeiten", "name": "Rumkugeln, 1 St., 20g", "points": "2"},
    {"category": "Süßigkeiten", "name": "Salmiakpastillen, 1 kl. Beutel, 40g", "points": "2"},
    {"category": "Süßigkeiten", "name": "Schaumküsse, 1 St., 20g", "points": "2"},
    {"category": "Süßigkeiten", "name": "Schaumzuckerware, 1 kl. Portion, 20g", "points": "1"},
    {"category": "Süßigkeiten", "name": "Schokolade, jede Sorte, 1 St., 7g", "points": "1"},
    {"category": "Süßigkeiten", "name": "Schokolinsen, 10 St., 10g", "points": "1"},
    {"category": "Süßigkeiten", "name": "Schokoriegel, zb. KitKat, Lion, 1 St.", "points": "5"},
    {"category": "Süßigkeiten", "name": "Süsse Schnitte, 1 St., 30g", "points": "3.5"},
    {"category": "Süßigkeiten", "name": "Traubenzuckerbonbons, 3 St., 7g", "points": "0.5"},
    {"category": "Süßigkeiten", "name": "Weinbrandbohne, 1 St., 8g", "points": "1"},

    {"category": "Vegetarische Produkte & Ei", "name": "Ei, 1 St., 50g", "points": "2"},
    {"category": "Vegetarische Produkte & Ei", "name": "Spiegelei, gebraten mit Fett, 1 St., 60g", "points": "1.5"},
    {"category": "Vegetarische Produkte & Ei", "name": "Soja-Dessert, jede Sorte, 1 kl. Portion, 150g", "points": "2.5"},
    {"category": "Vegetarische Produkte & Ei", "name": "Soja-Drink mit Zucker, jede Sorte, 1 Glas, 250ml", "points": "4"},
    {"category": "Vegetarische Produkte & Ei", "name": "Sojamilch, 1 Glas, 250ml", "points": "2"},
    {"category": "Vegetarische Produkte & Ei", "name": "Sojawürstchen, 1 St., 45g", "points": "2"},
    {"category": "Vegetarische Produkte & Ei", "name": "Tofu/Sojakäse, 1 Scheibe, 25g", "points": "0.5"},
    {"category": "Vegetarische Produkte & Ei", "name": "Vegetarische Tofubratlinge, 1 st., 100g", "points": "4.5"},

    {"category": "Würzmittel & Zutaten", "name": "Aromen, Backoblaten, Backöl, Essig", "points": "0"},
    {"category": "Würzmittel & Zutaten", "name": "Apfeldicksaft, 2 TL, 10ml", "points": "0.5"},
    {"category": "Würzmittel & Zutaten", "name": "Birnendicksaft, 4 TL, 20ml", "points": "0.5"},
    {"category": "Würzmittel & Zutaten", "name": "Bouillon, Brühe, Instant, 4 TL, 20g", "points": "0.5"},
    {"category": "Würzmittel & Zutaten", "name": "Croutons für Salat, Fertigprodukt, 1 EL, 5g", "points": "0.5"},
    {"category": "Würzmittel & Zutaten", "name": "Fonds, Gelatine, Gelin, Gemüsebrühe, Gewürze", "points": "0"},
    {"category": "Würzmittel & Zutaten", "name": "Fruchtzucker, 1 EL, 15g", "points": "1"},
    {"category": "Würzmittel & Zutaten", "name": "Gelierzucker, 1 EL, 15g", "points": "1"},
    {"category": "Würzmittel & Zutaten", "name": "Hefe/-extrakt, Kapern, Meerrettich", "points": "0"},
    {"category": "Würzmittel & Zutaten", "name": "hefe-Frischteig(Fertigprodukt), 1 Portion, 45g", "points": "2"},
    {"category": "Würzmittel & Zutaten", "name": "Kakaopulver, mit Zucker, 1 EL, 10g", "points": "1"},
    {"category": "Würzmittel & Zutaten", "name": "Kokosnussmilch, frisch, 1 Glas, 200ml", "points": "1"},
    {"category": "Würzmittel & Zutaten", "name": "Kräuterlinge, 1 St., 10g", "points": "1"},
    {"category": "Würzmittel & Zutaten", "name": "Mokkabohnen, 2 St., 3g", "points": "0.5"},
    {"category": "Würzmittel & Zutaten", "name": "Orangeat, 1 Packung, 100g", "points": "5"},
    {"category": "Würzmittel & Zutaten", "name": "Pfeffersauce, Senf, Sojasauce, Tomatenmark", "points": "0"},
    {"category": "Würzmittel & Zutaten", "name": "Pizza-Frischteig(Fertigprodukt), 1 Portion, 45g", "points": "2.5"},
    {"category": "Würzmittel & Zutaten", "name": "Puddingpulver, jede Sorte, 1 EL, 15g", "points": "0.5"},
    {"category": "Würzmittel & Zutaten", "name": "Röstzwiebeln, 1 eL, 5g", "points": "0.5"},
    {"category": "Würzmittel & Zutaten", "name": "Sahnesteif, 1 Packung, 9g", "points": "0.5"},
    {"category": "Würzmittel & Zutaten", "name": "Sanddornsaft, mit Zucker, 1 eL, 30ml", "points": "1"},
    {"category": "Würzmittel & Zutaten", "name": "Sirup, jede Sorte, 1 EL, 20ml", "points": "1"},
    {"category": "Würzmittel & Zutaten", "name": "Tortenguss, ohne Zucker, Würzen, Zitronensaft", "points": "0"},
    {"category": "Würzmittel & Zutaten", "name": "Zucker, jede Sorte, 1 TL, 3g", "points": "0"},
    {"category": "Würzmittel & Zutaten", "name": "Zucker, jede Sorte, 1 EL, 15g", "points": "1"},

    {"category": "Auswärts Essen", "name": "Baguette mit Salami, 1 St., 150g", "points": "8.5"},
    {"category": "Auswärts Essen", "name": "Brötchen mit Käse, 1/2 Stück, 60g", "points": "4"},
    {"category": "Auswärts Essen", "name": "Currywurst mit Sauce, 1 Portion", "points": "14"},
    {"category": "Auswärts Essen", "name": "Folienkartoffeln mit Saurer Sahne/Kräuterquark, 1 Portion", "points": "6"},
    {"category": "Auswärts Essen", "name": "Gyros, 1 kl. Portion", "points": "7.5"},
    {"category": "Auswärts Essen", "name": "Krabbenbrötchen, 1 Stück", "points": "7.5"},
    {"category": "Auswärts Essen", "name": "Milchshake Vanille, 1 kl. Portion, 300ml", "points": "7.5"},
    {"category": "Auswärts Essen", "name": "Pizza, 1 Ecke, 100g", "points": "5"},
    {"category": "Auswärts Essen", "name": "Salat Nizza(mit Thunfisch und Ei), 1 kl. Portion", "points": "5"},
    {"category": "Auswärts Essen", "name": "Toast Hawai, 1 Portion", "points": "6.5"},
    {"category": "Auswärts Essen", "name": "Tomatensuppe, 1 kl. Portion", "points": "2.5"},
    {"category": "Auswärts Essen", "name": "Türkische Pizza, 1 Portion", "points": "7"},
    {"category": "Auswärts Essen", "name": "Big Mac, 1 Stück", "points": "11.5"},
    {"category": "Auswärts Essen", "name": "Cheeseburger, 1 Stück", "points": "6.5"},
    {"category": "Auswärts Essen", "name": "Chicken mcNuggets, 6 Stück", "points": "5"},
    {"category": "Auswärts Essen", "name": "Döner Kebab", "points": "14"},
    {"category": "Auswärts Essen", "name": "Frikadelle, 1 kleine", "points": "6"},
    {"category": "Auswärts Essen", "name": "Hamburger, 1 Stück", "points": "5"},
    {"category": "Auswärts Essen", "name": "Pommes Frites, 1 mittlere Portion", "points": "9.5"},
    {"category": "Auswärts Essen", "name": "Rostbratburst, 1 Stück, 100g", "points": "10"},
    {"category": "Auswärts Essen", "name": "Schaschlik, 1 Spieß", "points": "6.5"},
    {"category": "Auswärts Essen", "name": "Schweinsbratwurst, 1 Stück", "points": "12.5"},
    {"category": "Auswärts Essen", "name": "Wiener Würstchen, 1 Stück", "points": "6"}
];



/*
    ***************************************************************************************************
*/


/*
class BlurExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isOpen: false };
        this.timeOutId = null;

        this.onClickHandler = this.onClickHandler.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
    }

    onClickHandler() {
        this.setState(currentState => ({
            isOpen: !currentState.isOpen
        }));
    }

    // We close the popover on the next tick by using setTimeout.
    // This is necessary because we need to first check if
    // another child of the element has received focus as
    // the blur event fires prior to the new focus event.
    onBlurHandler() {
        this.timeOutId = setTimeout(() => {
            this.setState({
                              isOpen: false
                          });
        });
    }

    // If a child receives focus, do not close the popover.
    onFocusHandler() {
        clearTimeout(this.timeOutId);
    }

    render() {
        // React assists us by bubbling the blur and
        // focus events to the parent.
        return (
            <div onBlur={this.onBlurHandler}
                 onFocus={this.onFocusHandler}>

                <button onClick={this.onClickHandler}
                        aria-haspopup="true"
                        aria-expanded={this.state.isOpen}>
                    Select an option
                </button>
                {this.state.isOpen ? (
                    <ul>
                        <li role="menuitemcheckbox" aria-checked="true">
                            Sort by Last Modified
                        </li>
                        <li>Option 1</li>
                        <li>Option 2</li>
                        <li>Option 3</li>
                    </ul>
                ) : null}
            </div>
        );
    }
}
*/


export default FilterableProductTable;
