
/**
 * Lokale analysefunctie die storingen automatisch categoriseert.
 * Hiermee is er geen externe API-sleutel of 'Jekyll' configuratie meer nodig.
 */
export const localAnalyzeMalfunction = (description: string) => {
  const desc = description.toLowerCase();
  let category = "Algemeen";
  let severity: 'Laag' | 'Gemiddeld' | 'Hoog' | 'Kritiek' = "Gemiddeld";
  let suggestion = "Controleer het voertuig op de aangegeven punten.";

  // Regels voor automatische categorisering en prioriteit
  if (desc.includes("motor") || desc.includes("start") || desc.includes("olie")) {
    category = "Motor";
    severity = "Hoog";
    suggestion = "Niet mee rijden indien lampjes branden. Controleer vloeistofniveaus.";
  } else if (desc.includes("rem") || desc.includes("stoppen") || desc.includes("lucht")) {
    category = "Remmen";
    severity = "Kritiek";
    suggestion = "VEILIGHEIDSRISICO: Stop de bus onmiddellijk en bel de technische dienst.";
  } else if (desc.includes("deur") || desc.includes("open") || desc.includes("klem")) {
    category = "Carrosserie";
    severity = "Gemiddeld";
    suggestion = "Controleer de deursensoren en de noodbediening.";
  } else if (desc.includes("lamp") || desc.includes("licht") || desc.includes("elektra") || desc.includes("dashboard")) {
    category = "Elektrisch";
    severity = "Laag";
    suggestion = "Mogelijk een defecte zekering of lampje. Kan vaak bij de volgende beurt.";
  } else if (desc.includes("verwarming") || desc.includes("koud") || desc.includes("airco") || desc.includes("heet")) {
    category = "Interieur";
    severity = "Laag";
    suggestion = "Controleer de klimaatinstellingen en filters.";
  }

  // Extra check voor kritieke situaties
  if (desc.includes("brand") || desc.includes("rook") || desc.includes("vuur") || desc.includes("stinkt")) {
    severity = "Kritiek";
    category = "Brandgevaar";
    suggestion = "EVACUEER DE BUS. Gebruik de brandblusser indien veilig en bel 112.";
  }

  return { category, severity, suggestion };
};
