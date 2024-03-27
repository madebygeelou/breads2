const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const Baker = require('../models/baker.js')
// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
  .then(foundBakers => {
 Bread.findById(req.params.id)
 .then(foundBread => {
  res.render('edit', {
    bread: foundBread,
    bakers: foundBakers
  })
 })
})
  })
// SHOW
breads.get('/:arrayIndex', (req, res) => {
    if (Bread[req.params.arrayIndex]){
  res.render('Show', {
    bread: Bread[req.params.arrayIndex],
    index: req.params.arrayIndex,
    })
  } else {
    res.send('404')
  }
  })

  
// INDEX
breads.get('/', (req, res) => {
   Bread.find()
   .then(foundBreads=>{
  res.render('index', {
    breads: foundBreads,
    title: 'Index Page'
  })
   })
  })

// NEW
breads.get('/new', (req, res) => {
 Baker.find()
 .then(foundBakers => {
  res.render('new', {
    bakers:foundBakers
  })
 })
})


// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = 'true'
  } else {
    req.body.hasGluten = 'false'
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

// UPDATE
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
    .then(updatedBread => {
      console.log(updatedBread) 
      res.redirect(`/breads/${req.params.id}`) 
    })
})
 //

breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
  .populate('baker')
      .then(foundBread => {
        const bakedBy = foundBread.getBakedBy()
        console.log(bakedBy)
          res.render('show', {
              bread: foundBread
          })
      })
})


// DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})



module.exports = breads
