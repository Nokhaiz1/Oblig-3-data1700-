package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

@Repository
public class BiletterRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreBiletter (Biletter nyBilett){
        String sql = "INSERT INTO Biletter (antall, fornavn, etternavn, mobilnummer, epost, navn) VALUES(?,?,?,?,?,?)";

        db.update(
                sql,
                nyBilett.getFilm(),
                nyBilett.getAntall(),
                nyBilett.getFornavn(),
                nyBilett.getEtternavn(),
                nyBilett.getTelefonnummer(),
                nyBilett.getEpost()
        );
    }

    public List<Biletter> hentAlle(){
        String sql = "SELECT * FROM Biletter";
        List<Biletter> alleFilmer = db.query(sql, new BeanPropertyRowMapper(Biletter.class));
        Collections.sort(alleFilmer, new NavnSortering());
        return alleFilmer;
    }

    public void slettAlle(){
        String sql = "DELETE FROM Biletter";
        db.update(sql);
    }


}
